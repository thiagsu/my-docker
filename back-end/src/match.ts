// @ts-ignore
import pool from "./db";
import type {Request, Response} from "express";

// @ts-ignore
export const getMatches = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(
            `SELECT m.id,
                    m.LOCATION    AS venue,
                    m.DAY         AS date,
                    m.TOUR_ID     AS tournamentId,
                    m.TEAM_A_ID   AS teamAId,
                    m.TEAM_B_ID   AS teamBId,
                    t1.name       AS teamAName,
                    t1.logo_img   AS teamALogo,
                    t2.name       AS teamBName,
                    t2.logo_img   AS teamBLogo,
                    m.SCORE_A     AS scoreA,
                    m.SCORE_B     AS scoreB,
                    m.COMPLETED   AS completed
             FROM MATCHES m
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             ORDER BY m.DAY ASC`
        );
        // @ts-ignore
        res.json(rows);
    } catch (err) {
        console.error("Error fetching matches:", err);
        // @ts-ignore
        res.status(500).json({message: "Failed to fetch matches"});
    }
};

// @ts-ignore
export const addMatch = async (req: Request, res: Response) => {
    const {tournamentId, teamAId, teamBId, date, venue, scoreA, scoreB, completed} = req.body || {};
    if (!teamAId || !teamBId || !date) {
        return res.status(400).json({message: "teamAId, teamBId and date are required"});
    }
    if (Number(teamAId) === Number(teamBId)) {
        return res.status(400).json({message: "Team A and Team B must be different"});
    }
    const normalizedCompleted = completed === "Y" || completed === "y" || completed === true ? "Y" : "N";
    try {
        const [result]: any = await pool.query(
            `INSERT INTO MATCHES (TOUR_ID, TEAM_A_ID, TEAM_B_ID, DAY, LOCATION, SCORE_A, SCORE_B, COMPLETED)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [tournamentId || null, teamAId, teamBId, date, venue || null,
                scoreA === undefined || scoreA === null || scoreA === "" ? null : Number(scoreA),
                scoreB === undefined || scoreB === null || scoreB === "" ? null : Number(scoreB),
                normalizedCompleted]
        );
        res.status(200).json({message: "Match created", id: result.insertId});
    } catch (err) {
        console.error("Error inserting match:", err);
        res.status(500).json({message: "Failed to save match"});
    }
};

// @ts-ignore
export const updateMatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {tournamentId, teamAId, teamBId, date, venue, scoreA, scoreB, completed} = req.body || {};
    if (!teamAId || !teamBId || !date) {
        return res.status(400).json({message: "teamAId, teamBId and date are required"});
    }
    if (Number(teamAId) === Number(teamBId)) {
        return res.status(400).json({message: "Team A and Team B must be different"});
    }
    const normalizedCompleted = completed === "Y" || completed === "y" || completed === true ? "Y" : "N";
    try {
        const [result]: any = await pool.query(
            `UPDATE MATCHES
             SET TOUR_ID    = ?,
                 TEAM_A_ID  = ?,
                 TEAM_B_ID  = ?,
                 DAY        = ?,
                 LOCATION   = ?,
                 SCORE_A    = ?,
                 SCORE_B    = ?,
                 COMPLETED  = ?
             WHERE id = ?`,
            [tournamentId || null, teamAId, teamBId, date, venue || null,
                scoreA === undefined || scoreA === null || scoreA === "" ? null : Number(scoreA),
                scoreB === undefined || scoreB === null || scoreB === "" ? null : Number(scoreB),
                normalizedCompleted,
                id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Match not found"});
        }
        res.status(200).json({message: "Match updated"});
    } catch (err) {
        console.error("Error updating match:", err);
        res.status(500).json({message: "Failed to update match"});
    }
};

