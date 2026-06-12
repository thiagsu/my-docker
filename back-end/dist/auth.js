"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signup = exports.logout = exports.login = void 0;
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
exports.hashPassword = hashPassword;
// @ts-ignore
const db_1 = __importDefault(require("./db"));
// @ts-ignore
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_NAME = "auth";
const TOKEN_TTL = "12h";
function sign(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL });
}
function verify(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
}
// @ts-ignore
const login = async (req, res) => {
    const { userId, password } = req.body || {};
    if (!userId || !password) {
        return res.status(400).json({ message: "userId and password are required" });
    }
    try {
        const [rows] = await db_1.default.query(`SELECT Userid AS userId, name, role, credential
             FROM PREDICT_USER
             WHERE Userid = ?`, [userId]);
        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const row = rows[0];
        const stored = row.credential ? row.credential.toString("utf8") : "";
        if (!stored) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const ok = await bcryptjs_1.default.compare(password, stored);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = sign({ userId: row.userId, role: row.role || "user" });
        res.cookie(TOKEN_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 12 * 60 * 60 * 1000,
        });
        res.json({ userId: row.userId, name: row.name, role: row.role || "user" });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
    }
};
exports.login = login;
// @ts-ignore
const logout = (_req, res) => {
    res.clearCookie(TOKEN_NAME);
    res.json({ message: "Logged out" });
};
exports.logout = logout;
// @ts-ignore
const signup = async (req, res) => {
    const { userId, name, email, country } = req.body || {};
    if (!userId || !name) {
        return res.status(400).json({ message: "userId and name are required" });
    }
    const trimmedId = String(userId).trim();
    const trimmedName = String(name).trim();
    if (!trimmedId || !trimmedName) {
        return res.status(400).json({ message: "userId and name cannot be blank" });
    }
    // Determine client IP. Honor X-Forwarded-For if present (first hop).
    const xff = (req.headers["x-forwarded-for"] || "");
    // @ts-ignore
    let ip = xff.split(",")[0].trim() || req.socket?.remoteAddress || req.ip || "";
    if (ip.startsWith("::ffff:"))
        ip = ip.slice(7); // normalize IPv4-mapped IPv6
    try {
        await db_1.default.query(`INSERT INTO PREDICT_USER (Userid, name, email, photo_img, role, country, ip_address, credential)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            trimmedId,
            trimmedName,
            email || null,
            null,
            "user",
            country ? String(country).trim() || null : null,
            ip || null,
            null,
        ]);
        res.status(200).json({
            userId: trimmedId,
            name: trimmedName,
            message: "Account created. Please get a temporary password from the Administrator to sign in.",
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        if (err && err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "User with that id already exists" });
        }
        res.status(500).json({ message: "Signup failed" });
    }
};
exports.signup = signup;
// @ts-ignore
const me = async (req, res) => {
    const token = req.cookies?.[TOKEN_NAME];
    const payload = token ? verify(token) : null;
    if (!payload)
        return res.status(401).json({ message: "Not authenticated" });
    try {
        const [rows] = await db_1.default.query(`SELECT Userid AS userId, name, email, photo_img AS photoImage, role
             FROM PREDICT_USER
             WHERE Userid = ?`, [payload.userId]);
        if (!rows || rows.length === 0)
            return res.status(401).json({ message: "Not authenticated" });
        res.json(rows[0]);
    }
    catch (err) {
        console.error("Me error:", err);
        res.status(500).json({ message: "Failed to load user" });
    }
};
exports.me = me;
// @ts-ignore
function requireAuth(req, res, next) {
    const token = req.cookies?.[TOKEN_NAME];
    const payload = token ? verify(token) : null;
    if (!payload)
        return res.status(401).json({ message: "Not authenticated" });
    req.user = payload;
    next();
}
// @ts-ignore
function requireRole(role) {
    return (req, res, next) => {
        const user = req.user;
        if (!user || user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
}
// @ts-ignore
async function hashPassword(plain) {
    return bcryptjs_1.default.hash(plain, 10);
}
//# sourceMappingURL=auth.js.map