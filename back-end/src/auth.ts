// @ts-ignore
import type {Request, Response, NextFunction} from "express";
// @ts-ignore
import pool from "./db";
// @ts-ignore
import bcrypt from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_NAME = "auth";
const TOKEN_TTL = "12h";

type AuthPayload = {userId: string; role: string};

function sign(payload: AuthPayload): string {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: TOKEN_TTL});
}

function verify(token: string): AuthPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as AuthPayload;
    } catch {
        return null;
    }
}

// @ts-ignore
export const login = async (req: Request, res: Response) => {
    const {userId, password} = req.body || {};
    if (!userId || !password) {
        return res.status(400).json({message: "userId and password are required"});
    }
    try {
        const [rows]: any = await pool.query(
            `SELECT Userid AS userId, name, role, credential
             FROM PREDICT_USER
             WHERE Userid = ?`,
            [userId]
        );
        if (!rows || rows.length === 0) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        const row = rows[0];
        const stored: string = row.credential ? row.credential.toString("utf8") : "";
        if (!stored) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        const ok = await bcrypt.compare(password, stored);
        if (!ok) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = sign({userId: row.userId, role: row.role || "user"});
        res.cookie(TOKEN_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 12 * 60 * 60 * 1000,
        });
        res.json({userId: row.userId, name: row.name, role: row.role || "user"});
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({message: "Login failed"});
    }
};

// @ts-ignore
export const logout = (_req: Request, res: Response) => {
    res.clearCookie(TOKEN_NAME);
    res.json({message: "Logged out"});
};

// @ts-ignore
export const signup = async (req: Request, res: Response) => {
    const {userId, name, email, country} = req.body || {};
    if (!userId || !name) {
        return res.status(400).json({message: "userId and name are required"});
    }
    const trimmedId = String(userId).trim();
    const trimmedName = String(name).trim();
    if (!trimmedId || !trimmedName) {
        return res.status(400).json({message: "userId and name cannot be blank"});
    }
    // Determine client IP. Honor X-Forwarded-For if present (first hop).
    const xff = (req.headers["x-forwarded-for"] || "") as string;
    // @ts-ignore
    let ip = xff.split(",")[0].trim() || req.socket?.remoteAddress || req.ip || "";
    if (ip.startsWith("::ffff:")) ip = ip.slice(7); // normalize IPv4-mapped IPv6
    try {
        await pool.query(
            `INSERT INTO PREDICT_USER (Userid, name, email, photo_img, role, country, ip_address, credential)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                trimmedId,
                trimmedName,
                email || null,
                null,
                "user",
                country ? String(country).trim() || null : null,
                ip || null,
                null,
            ]
        );
        res.status(200).json({
            userId: trimmedId,
            name: trimmedName,
            message: "Account created. Please get a temporary password from the Administrator to sign in.",
        });
    } catch (err: any) {
        console.error("Signup error:", err);
        if (err && err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({message: "User with that id already exists"});
        }
        res.status(500).json({message: "Signup failed"});
    }
};

// @ts-ignore
export const me = async (req: Request, res: Response) => {
    const token = req.cookies?.[TOKEN_NAME];
    const payload = token ? verify(token) : null;
    if (!payload) return res.status(401).json({message: "Not authenticated"});
    try {
        const [rows]: any = await pool.query(
            `SELECT Userid AS userId, name, email, photo_img AS photoImage, role
             FROM PREDICT_USER
             WHERE Userid = ?`,
            [payload.userId]
        );
        if (!rows || rows.length === 0) return res.status(401).json({message: "Not authenticated"});
        res.json(rows[0]);
    } catch (err) {
        console.error("Me error:", err);
        res.status(500).json({message: "Failed to load user"});
    }
};

// @ts-ignore
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.[TOKEN_NAME];
    const payload = token ? verify(token) : null;
    if (!payload) return res.status(401).json({message: "Not authenticated"});
    (req as any).user = payload;
    next();
}

// @ts-ignore
export function requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as AuthPayload | undefined;
        if (!user || user.role !== role) {
            return res.status(403).json({message: "Forbidden"});
        }
        next();
    };
}

// @ts-ignore
export async function hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
}

