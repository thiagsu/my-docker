// @ts-ignore
import pool from "./db";
import type {Request, Response} from "express";
import type {Team, Tournament} from "./Entity";

// @ts-ignore
export const getTeams= async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, name, logo_img AS logoImage
             FROM TEAM t`
        );
        // @ts-ignore
        res.json(rows);

    } catch (err) {
        console.error("Error fetching teams:", err);
        // @ts-ignore
        res.status(500).json({message: "Failed to fetch matches"});
    }
};

// @ts-ignore
export const addTeam = async (req: Request, res: Response) => {
    const team: Team = req.body;
    console.log("Received team data:", team);
    try {
        const [result]: any = await pool.query(
            `INSERT INTO TEAM (name,  logo_img)
             VALUES (?, ?)`,
            [team.name,  team.logoImage]
        );
        res.status(200).json({
            message: "Tournament data received successfully",
            id: result.insertId,
        });
    } catch (err) {
        console.error("Error inserting tournament:", err);
        res.status(500).json({message: "Failed to save tournament"});
    }
};

// @ts-ignore
export const updateTeam = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, logoImage} = req.body || {};
    if (!name) {
        return res.status(400).json({message: "name is required"});
    }
    try {
        const [result]: any = await pool.query(
            `UPDATE TEAM
             SET name     = ?,
                 logo_img = ?
             WHERE id = ?`,
            [name, logoImage || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Team not found"});
        }
        res.status(200).json({message: "Team updated"});
    } catch (err) {
        console.error("Error updating team:", err);
        res.status(500).json({message: "Failed to update team"});
    }
};

