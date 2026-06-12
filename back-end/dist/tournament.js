"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTournamentTeam = exports.getTournamentTeams = exports.associateTeamToTournament = exports.updateTournament = exports.addTournament = exports.getTournament = void 0;
// @ts-ignore
const db_1 = __importDefault(require("./db"));
const addTournament = async (req, res) => {
    const tournament = req.body;
    console.log("Received tournament data:", tournament);
    try {
        const [result] = await db_1.default.query(`INSERT INTO TOURNAMENT (name, description, logo_img)
             VALUES (?, ?, ?)`, [tournament.name, tournament.description, tournament.logoImage]);
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
exports.addTournament = addTournament;
const updateTournament = async (req, res) => {
    const { id } = req.params;
    const { name, description, logoImage } = req.body || {};
    if (!name) {
        return res.status(400).json({ message: "name is required" });
    }
    try {
        const [result] = await db_1.default.query(`UPDATE TOURNAMENT
             SET name        = ?,
                 description = ?,
                 logo_img    = ?
             WHERE id = ?`, [name, description || null, logoImage || null, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.status(200).json({ message: "Tournament updated" });
    }
    catch (err) {
        console.error("Error updating tournament:", err);
        res.status(500).json({ message: "Failed to update tournament" });
    }
};
exports.updateTournament = updateTournament;
const getTournament = async (req, res) => {
    try {
        const [rows] = await db_1.default.query(`SELECT id, name, description, logo_img AS logoImage
             FROM TOURNAMENT t`);
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching matches:", err);
        res.status(500).json({ message: "Failed to fetch matches" });
    }
};
exports.getTournament = getTournament;
const associateTeamToTournament = async (req, res) => {
    const { teamId, tournamentId, groupName } = req.body || {};
    if (!teamId || !tournamentId) {
        return res.status(400).json({ message: "teamId and tournamentId are required" });
    }
    try {
        const [result] = await db_1.default.query(`INSERT INTO TOUR_TEAMS (TOUR_ID, TEAM_ID, GROUP_NAME)
             VALUES (?, ?, ?)`, [tournamentId, teamId, groupName || null]);
        res.status(200).json({
            message: "Team associated with tournament",
            id: result.insertId,
        });
    }
    catch (err) {
        console.error("Error associating team to tournament:", err);
        res.status(500).json({ message: "Failed to associate team with tournament" });
    }
};
exports.associateTeamToTournament = associateTeamToTournament;
const getTournamentTeams = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db_1.default.query(`SELECT tt.id         AS id,
                    t.id          AS teamId,
                    t.name        AS teamName,
                    t.logo_img    AS logoImage,
                    tt.GROUP_NAME AS groupName
             FROM TOUR_TEAMS tt
                      INNER JOIN TEAM t ON t.id = tt.TEAM_ID
             WHERE tt.TOUR_ID = ?
             ORDER BY tt.GROUP_NAME ASC, t.name ASC`, [id]);
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching tournament teams:", err);
        res.status(500).json({ message: "Failed to fetch tournament teams" });
    }
};
exports.getTournamentTeams = getTournamentTeams;
const updateTournamentTeam = async (req, res) => {
    const { assocId } = req.params;
    const { teamId, groupName } = req.body || {};
    if (!teamId) {
        return res.status(400).json({ message: "teamId is required" });
    }
    try {
        const [result] = await db_1.default.query(`UPDATE TOUR_TEAMS
             SET TEAM_ID = ?,
                 GROUP_NAME = ?
             WHERE id = ?`, [teamId, groupName || null, assocId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Association not found" });
        }
        res.status(200).json({ message: "Association updated" });
    }
    catch (err) {
        console.error("Error updating tournament team association:", err);
        res.status(500).json({ message: "Failed to update association" });
    }
};
exports.updateTournamentTeam = updateTournamentTeam;
//# sourceMappingURL=tournament.js.map