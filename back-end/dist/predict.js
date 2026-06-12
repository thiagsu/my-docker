"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePrediction = exports.getPrediction = exports.getMyPredictions = void 0;
// @ts-ignore
const db_1 = __importDefault(require("./db"));
// GET /predict - list all predictions made by the current user
// @ts-ignore
const getMyPredictions = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId)
        return res.status(401).json({ message: "Not authenticated" });
    try {
        const [rows] = await db_1.default.query(`SELECT p.id            AS predictionId,
                    p.MATCH_ID      AS matchId,
                    p.SCORE_A       AS predScoreA,
                    p.SCORE_B       AS predScoreB,
                    m.DAY           AS date,
                    m.LOCATION      AS venue,
                    m.SCORE_A       AS scoreA,
                    m.SCORE_B       AS scoreB,
                    t1.name         AS teamAName,
                    t2.name         AS teamBName
             FROM MATCH_PREDICT p
                      JOIN MATCHES m ON m.id = p.MATCH_ID
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             WHERE p.USERID = ?
             ORDER BY m.DAY DESC`, [userId]);
        // @ts-ignore
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching my predictions:", err);
        res.status(500).json({ message: "Failed to fetch predictions" });
    }
};
exports.getMyPredictions = getMyPredictions;
// GET /predict/:matchId - returns match details and current user's prediction (if any)// @ts-ignore
// @ts-ignore
const getPrediction = async (req, res) => {
    const { matchId } = req.params;
    const userId = req.user?.userId;
    if (!userId)
        return res.status(401).json({ message: "Not authenticated" });
    try {
        const [matchRows] = await db_1.default.query(`SELECT m.id,
                    m.LOCATION  AS venue,
                    m.DAY       AS date,
                    m.TEAM_A_ID AS teamAId,
                    m.TEAM_B_ID AS teamBId,
                    t1.name     AS teamAName,
                    t2.name     AS teamBName,
                    m.SCORE_A   AS scoreA,
                    m.SCORE_B   AS scoreB
             FROM MATCHES m
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             WHERE m.id = ?`, [matchId]);
        if (!matchRows || matchRows.length === 0) {
            return res.status(404).json({ message: "Match not found" });
        }
        const [predRows] = await db_1.default.query(`SELECT id, SCORE_A AS scoreA, SCORE_B AS scoreB
             FROM MATCH_PREDICT
             WHERE MATCH_ID = ? AND USERID = ?`, [matchId, userId]);
        res.json({
            match: matchRows[0],
            prediction: predRows && predRows.length > 0 ? predRows[0] : null,
        });
    }
    catch (err) {
        console.error("Error fetching prediction:", err);
        res.status(500).json({ message: "Failed to fetch prediction" });
    }
};
exports.getPrediction = getPrediction;
// POST /predict/:matchId - upsert current user's prediction
// @ts-ignore
const savePrediction = async (req, res) => {
    const { matchId } = req.params;
    const { scoreA, scoreB } = req.body || {};
    const userId = req.user?.userId;
    if (!userId)
        return res.status(401).json({ message: "Not authenticated" });
    if (scoreA === undefined || scoreA === null || scoreA === "" ||
        scoreB === undefined || scoreB === null || scoreB === "") {
        return res.status(400).json({ message: "scoreA and scoreB are required" });
    }
    const a = Number(scoreA);
    const b = Number(scoreB);
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) {
        return res.status(400).json({ message: "Scores must be non-negative integers" });
    }
    try {
        const [matchRows] = await db_1.default.query(`SELECT id FROM MATCHES WHERE id = ?`, [matchId]);
        if (!matchRows || matchRows.length === 0) {
            return res.status(404).json({ message: "Match not found" });
        }
        await db_1.default.query(`INSERT INTO MATCH_PREDICT (MATCH_ID, USERID, SCORE_A, SCORE_B)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE SCORE_A = VALUES(SCORE_A), SCORE_B = VALUES(SCORE_B)`, [matchId, userId, a, b]);
        res.status(200).json({ message: "Prediction saved" });
    }
    catch (err) {
        console.error("Error saving prediction:", err);
        res.status(500).json({ message: "Failed to save prediction" });
    }
};
exports.savePrediction = savePrediction;
//# sourceMappingURL=predict.js.map