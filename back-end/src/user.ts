// @ts-ignore
import pool from "./db";
import type {Request, Response} from "express";
// @ts-ignore
import {hashPassword} from "./auth";

// @ts-ignore
export const getUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            `SELECT Userid AS userId,
                    name,
                    email,
                    photo_img AS photoImage,
                    role
             FROM PREDICT_USER
             ORDER BY Userid ASC`
        );
        // @ts-ignore
        res.json(rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        // @ts-ignore
        res.status(500).json({message: "Failed to fetch users"});
    }
};

// @ts-ignore
export const addUser = async (req: Request, res: Response) => {
    const {userId, name, email, photoImage, role, password} = req.body || {};
    if (!userId || !name) {
        return res.status(400).json({message: "userId and name are required"});
    }
    if (!password) {
        return res.status(400).json({message: "password is required"});
    }
    try {
        const hash = await hashPassword(password);
        await pool.query(
            `INSERT INTO PREDICT_USER (Userid, name, email, photo_img, role, credential)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, name, email || null, photoImage || null, role || "user", Buffer.from(hash, "utf8")]
        );
        res.status(200).json({message: "User created", id: userId});
    } catch (err: any) {
        console.error("Error inserting user:", err);
        if (err && err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({message: "User with that id already exists"});
        }
        res.status(500).json({message: "Failed to save user"});
    }
};

// @ts-ignore
export const updateUser = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const {name, email, photoImage, role, password} = req.body || {};
    if (!name) {
        return res.status(400).json({message: "name is required"});
    }
    try {
        let result: any;
        if (password) {
            const hash = await hashPassword(password);
            [result] = await pool.query(
                `UPDATE PREDICT_USER
                 SET name      = ?,
                     email     = ?,
                     photo_img = ?,
                     role      = ?,
                     credential = ?
                 WHERE Userid = ?`,
                [name, email || null, photoImage || null, role || "user", Buffer.from(hash, "utf8"), userId]
            );
        } else {
            [result] = await pool.query(
                `UPDATE PREDICT_USER
                 SET name      = ?,
                     email     = ?,
                     photo_img = ?,
                     role      = ?
                 WHERE Userid = ?`,
                [name, email || null, photoImage || null, role || "user", userId]
            );
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User updated"});
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({message: "Failed to update user"});
    }
};

