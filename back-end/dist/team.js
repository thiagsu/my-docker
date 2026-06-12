"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeam = exports.addTeam = exports.getTeams = void 0;
// @ts-ignore
const db_1 = __importDefault(require("./db"));
// @ts-ignore
const getTeams = async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`SELECT id, name, logo_img AS logoImage
             FROM TEAM t`);
        // @ts-ignore
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching teams:", err);
        // @ts-ignore
        res.status(500).json({ message: "Failed to fetch matches" });
    }
};
exports.getTeams = getTeams;
// @ts-ignore
const addTeam = async (req, res) => {
    const team = req.body;
    console.log("Received team data:", team);
    try {
        const [result] = await db_1.default.query(`INSERT INTO TEAM (name,  logo_img)
             VALUES (?, ?)`, [team.name, team.logoImage]);
        res.status(200).json({
            message: "Tournament data received successfully",
            id: result.insertId,
        });
    }
    catch (err) {
        console.error("Error inserting tournament:", err);
        res.status(500).json({ message: "Failed to save tournament" });
    }
};
exports.addTeam = addTeam;
// @ts-ignore
const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, logoImage } = req.body || {};
    if (!name) {
        return res.status(400).json({ message: "name is required" });
    }
    try {
        const [result] = await db_1.default.query(`UPDATE TEAM
             SET name     = ?,
                 logo_img = ?
             WHERE id = ?`, [name, logoImage || null, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json({ message: "Team updated" });
    }
    catch (err) {
        console.error("Error updating team:", err);
        res.status(500).json({ message: "Failed to update team" });
    }
};
exports.updateTeam = updateTeam;
//# sourceMappingURL=team.js.map