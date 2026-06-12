"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.addUser = exports.getUsers = void 0;
// @ts-ignore
const db_1 = __importDefault(require("./db"));
// @ts-ignore
const auth_1 = require("./auth");
// @ts-ignore
const getUsers = async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`SELECT Userid AS userId,
                    name,
                    email,
                    photo_img AS photoImage,
                    role
             FROM PREDICT_USER
             ORDER BY Userid ASC`);
        // @ts-ignore
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        // @ts-ignore
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
exports.getUsers = getUsers;
// @ts-ignore
const addUser = async (req, res) => {
    const { userId, name, email, photoImage, role, password } = req.body || {};
    if (!userId || !name) {
        return res.status(400).json({ message: "userId and name are required" });
    }
    if (!password) {
        return res.status(400).json({ message: "password is required" });
    }
    try {
        const hash = await (0, auth_1.hashPassword)(password);
        await db_1.default.query(`INSERT INTO PREDICT_USER (Userid, name, email, photo_img, role, credential)
             VALUES (?, ?, ?, ?, ?, ?)`, [userId, name, email || null, photoImage || null, role || "user", Buffer.from(hash, "utf8")]);
        res.status(200).json({ message: "User created", id: userId });
    }
    catch (err) {
        console.error("Error inserting user:", err);
        if (err && err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "User with that id already exists" });
        }
        res.status(500).json({ message: "Failed to save user" });
    }
};
exports.addUser = addUser;
// @ts-ignore
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, photoImage, role, password } = req.body || {};
    if (!name) {
        return res.status(400).json({ message: "name is required" });
    }
    try {
        let result;
        if (password) {
            const hash = await (0, auth_1.hashPassword)(password);
            [result] = await db_1.default.query(`UPDATE PREDICT_USER
                 SET name      = ?,
                     email     = ?,
                     photo_img = ?,
                     role      = ?,
                     credential = ?
                 WHERE Userid = ?`, [name, email || null, photoImage || null, role || "user", Buffer.from(hash, "utf8"), userId]);
        }
        else {
            [result] = await db_1.default.query(`UPDATE PREDICT_USER
                 SET name      = ?,
                     email     = ?,
                     photo_img = ?,
                     role      = ?
                 WHERE Userid = ?`, [name, email || null, photoImage || null, role || "user", userId]);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated" });
    }
    catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Failed to update user" });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.js.map