// @ts-ignore
import pool from "./db";
import type {Request, Response} from "express";

// GET /predict - list all predictions made by the current user
// @ts-ignore
export const getMyPredictions = async (req: Request, res: Response) => {
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({message: "Not authenticated"});
    try {
        const [rows] = await pool.query(
            `SELECT p.id            AS predictionId,
                    p.MATCH_ID      AS matchId,
                    p.SCORE_A       AS predScoreA,
                    p.SCORE_B       AS predScoreB,
                    m.DAY           AS date,
                    m.LOCATION      AS venue,
                    m.SCORE_A       AS scoreA,
                    m.SCORE_B       AS scoreB,
                    m.COMPLETED     AS completed,
                    t1.name         AS teamAName,
                    t2.name         AS teamBName
             FROM MATCH_PREDICT p
                      JOIN MATCHES m ON m.id = p.MATCH_ID
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             WHERE p.USERID = ?
             ORDER BY m.DAY DESC`,
            [userId]
        );
        // @ts-ignore
        res.json(rows);
    } catch (err) {
        console.error("Error fetching my predictions:", err);
        res.status(500).json({message: "Failed to fetch predictions"});
    }
};

// GET /predict/:matchId - returns match details and current user's prediction (if any)// @ts-ignore
// @ts-ignore
export const getPrediction = async (req: Request, res: Response) => {
    const {matchId} = req.params;
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({message: "Not authenticated"});
    try {
        const [matchRows]: any = await pool.query(
            `SELECT m.id,
                    m.LOCATION  AS venue,
                    m.DAY       AS date,
                    m.TEAM_A_ID AS teamAId,
                    m.TEAM_B_ID AS teamBId,
                    t1.name     AS teamAName,
                    t1.logo_img AS teamALogo,
                    t2.name     AS teamBName,
                    t2.logo_img AS teamBLogo,
                    m.SCORE_A   AS scoreA,
                    m.SCORE_B   AS scoreB,
                    m.COMPLETED AS completed
             FROM MATCHES m
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             WHERE m.id = ?`,
            [matchId]
        );
        if (!matchRows || matchRows.length === 0) {
            return res.status(404).json({message: "Match not found"});
        }
        const [predRows]: any = await pool.query(
            `SELECT id, SCORE_A AS scoreA, SCORE_B AS scoreB
             FROM MATCH_PREDICT
             WHERE MATCH_ID = ? AND USERID = ?`,
            [matchId, userId]
        );
        res.json({
            match: matchRows[0],
            prediction: predRows && predRows.length > 0 ? predRows[0] : null,
        });
    } catch (err) {
        console.error("Error fetching prediction:", err);
        res.status(500).json({message: "Failed to fetch prediction"});
    }
};

// GET /predict/:matchId/all - returns match details and all user predictions for the match
// @ts-ignore
export const getMatchPredictions = async (req: Request, res: Response) => {
    const {matchId} = req.params;
    const userRole = (req as any).user?.role;
    if (!userRole) return res.status(401).json({message: "Not authenticated"});
    if (userRole !== "admin") return res.status(403).json({message: "Forbidden"});
    try {
        const [matchRows]: any = await pool.query(
            `SELECT m.id,
                    m.LOCATION  AS venue,
                    m.DAY       AS date,
                    m.TEAM_A_ID AS teamAId,
                    m.TEAM_B_ID AS teamBId,
                    t1.name     AS teamAName,
                    t1.logo_img AS teamALogo,
                    t2.name     AS teamBName,
                    t2.logo_img AS teamBLogo,
                    m.SCORE_A   AS scoreA,
                    m.SCORE_B   AS scoreB,
                    m.COMPLETED AS completed
             FROM MATCHES m
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             WHERE m.id = ?`,
            [matchId]
        );
        if (!matchRows || matchRows.length === 0) {
            return res.status(404).json({message: "Match not found"});
        }
        const [rows]: any = await pool.query(
            `SELECT p.id,
                    p.USERID AS userId,
                    u.name   AS userName,
                    u.photo_img AS userPhoto,
                    p.SCORE_A AS scoreA,
                    p.SCORE_B AS scoreB
             FROM MATCH_PREDICT p
                      LEFT JOIN PREDICT_USER u ON u.Userid = p.USERID
             WHERE p.MATCH_ID = ?
             ORDER BY u.name ASC, p.USERID ASC`,
            [matchId]
        );
        res.json({match: matchRows[0], predictions: rows});
    } catch (err) {
        console.error("Error fetching match predictions:", err);
        res.status(500).json({message: "Failed to fetch match predictions"});
    }
};

// POST /predict/:matchId - upsert current user's prediction
// @ts-ignore
export const savePrediction = async (req: Request, res: Response) => {
    const {matchId} = req.params;
    const {scoreA, scoreB} = req.body || {};
    const userId = (req as any).user?.userId;
    if (!userId) return res.status(401).json({message: "Not authenticated"});
    if (scoreA === undefined || scoreA === null || scoreA === "" ||
        scoreB === undefined || scoreB === null || scoreB === "") {
        return res.status(400).json({message: "scoreA and scoreB are required"});
    }
    const a = Number(scoreA);
    const b = Number(scoreB);
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
        return res.status(400).json({message: "Scores must be non-negative integers"});
    }
    try {
        const [matchRows]: any = await pool.query(
            `SELECT id FROM MATCHES WHERE id = ?`, [matchId]
        );
        if (!matchRows || matchRows.length === 0) {
            return res.status(404).json({message: "Match not found"});
        }
        await pool.query(
            `INSERT INTO MATCH_PREDICT (MATCH_ID, USERID, SCORE_A, SCORE_B)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE SCORE_A = VALUES(SCORE_A), SCORE_B = VALUES(SCORE_B)`,
            [matchId, userId, a, b]
        );
        res.status(200).json({message: "Prediction saved"});
    } catch (err) {
        console.error("Error saving prediction:", err);
        res.status(500).json({message: "Failed to save prediction"});
    }
};

// GET /user/:userId/predictions - returns all predictions for a user with their match details (admin only)
// @ts-ignore
export const getUserPredictions = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const userRole = (req as any).user?.role;
    if (!userRole) return res.status(401).json({message: "Not authenticated"});
    if (userRole !== "admin") return res.status(403).json({message: "Forbidden"});
    try {
        const [userRows]: any = await pool.query(
            `SELECT userid AS userId, name, email FROM PREDICT_USER WHERE userid = ?`,
            [userId]
        );
        if (!userRows || userRows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        const user = userRows[0];
        const [predRows]: any = await pool.query(
            `SELECT p.id,
                    p.MATCH_ID AS matchId,
                    p.SCORE_A  AS predScoreA,
                    p.SCORE_B  AS predScoreB,
                    m.DAY      AS date,
                    t1.name    AS teamAName,
                    t2.name    AS teamBName,
                    m.SCORE_A  AS scoreA,
                    m.SCORE_B  AS scoreB,
                    m.COMPLETED AS completed
             FROM MATCH_PREDICT p
                      JOIN MATCHES m ON m.id = p.MATCH_ID
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             WHERE p.USERID = ?
             ORDER BY m.DAY DESC`,
            [userId]
        );
        res.json({user, predictions: predRows || []});
    } catch (err) {
        console.error("Error fetching user predictions:", err);
        res.status(500).json({message: "Failed to fetch user predictions"});
    }
};

