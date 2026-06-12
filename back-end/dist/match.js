"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatch = exports.addMatch = exports.getMatches = void 0;
// @ts-ignore
const db_1 = __importDefault(require("./db"));
// @ts-ignore
const getMatches = async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`SELECT m.id,
                    m.LOCATION    AS venue,
                    m.DAY         AS date,
                    m.TOUR_ID     AS tournamentId,
                    m.TEAM_A_ID   AS teamAId,
                    m.TEAM_B_ID   AS teamBId,
                    t1.name       AS teamAName,
                    t2.name       AS teamBName,
                    m.SCORE_A     AS scoreA,
                    m.SCORE_B     AS scoreB
             FROM MATCHES m
                      LEFT JOIN TEAM t1 ON t1.id = m.TEAM_A_ID
                      LEFT JOIN TEAM t2 ON t2.id = m.TEAM_B_ID
             ORDER BY m.DAY ASC`);
        // @ts-ignore
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching matches:", err);
        // @ts-ignore
        res.status(500).json({ message: "Failed to fetch matches" });
    }
};
exports.getMatches = getMatches;
// @ts-ignore
const addMatch = async (req, res) => {
    const { tournamentId, teamAId, teamBId, date, venue, scoreA, scoreB } = req.body || {};
    if (!teamAId || !teamBId || !date) {
        return res.status(400).json({ message: "teamAId, teamBId and date are required" });
    }
    if (Number(teamAId) === Number(teamBId)) {
        return res.status(400).json({ message: "Team A and Team B must be different" });
    }
    try {
        const [result] = await db_1.default.query(`INSERT INTO MATCHES (TOUR_ID, TEAM_A_ID, TEAM_B_ID, DAY, LOCATION, SCORE_A, SCORE_B)
             VALUES (?, ?, ?, ?, ?, ?, ?)`, [tournamentId || null, teamAId, teamBId, date, venue || null,
            scoreA === undefined || scoreA === null || scoreA === "" ? null : Number(scoreA),
            scoreB === undefined || scoreB === null || scoreB === "" ? null : Number(scoreB)]);
        res.status(200).json({ message: "Match created", id: result.insertId });
    }
    catch (err) {
        console.error("Error inserting match:", err);
        res.status(500).json({ message: "Failed to save match" });
    }
};
exports.addMatch = addMatch;
// @ts-ignore
const updateMatch = async (req, res) => {
    const { id } = req.params;
    const { tournamentId, teamAId, teamBId, date, venue, scoreA, scoreB } = req.body || {};
    if (!teamAId || !teamBId || !date) {
        return res.status(400).json({ message: "teamAId, teamBId and date are required" });
    }
    if (Number(teamAId) === Number(teamBId)) {
        return res.status(400).json({ message: "Team A and Team B must be different" });
    }
    try {
        const [result] = await db_1.default.query(`UPDATE MATCHES
             SET TOUR_ID    = ?,
                 TEAM_A_ID  = ?,
                 TEAM_B_ID  = ?,
                 DAY        = ?,
                 LOCATION   = ?,
                 SCORE_A    = ?,
                 SCORE_B    = ?
             WHERE id = ?`, [tournamentId || null, teamAId, teamBId, date, venue || null,
            scoreA === undefined || scoreA === null || scoreA === "" ? null : Number(scoreA),
            scoreB === undefined || scoreB === null || scoreB === "" ? null : Number(scoreB),
            id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Match not found" });
        }
        res.status(200).json({ message: "Match updated" });
    }
    catch (err) {
        console.error("Error updating match:", err);
        res.status(500).json({ message: "Failed to update match" });
    }
};
exports.updateMatch = updateMatch;
//# sourceMappingURL=match.js.map