"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPuzzle = exports.getGames = void 0;
// @ts-ignore
const db_1 = require("./db");
// GET /puzzle/game — list all games defined in the puzzle DB.
const getGames = async (_req, res) => {
    try {
        const [rows] = await db_1.puzzlePool.query(`SELECT id, name, grid_size AS gridSize
             FROM GAME
             ORDER BY name ASC`);
        res.json(rows);
    }
    catch (err) {
        console.error("Error fetching puzzle games:", err);
        res.status(500).json({ message: "Failed to fetch puzzle games" });
    }
};
exports.getGames = getGames;
// POST /puzzle — save a puzzle: insert into CURR_GAME, then bulk-insert
// each non-empty cell value into GAME_CELLS within a single transaction.
// puzzleId is supplied by the client.
//
// For Tango cells the client also sends `cellRels`, a parallel 2D array of
// {topRel, rightRel, bottomRel, leftRel} objects where each *Rel is:
//   1 = Equal, 2 = Not Equal, null/0 = no marker.
// The cell value for Tango is 1 (Full Moon) or 2 (Crescent).
const addPuzzle = async (req, res) => {
    const { puzzleId, gameId, gameDay, gridSize, cells, cellColors, cellRels } = req.body || {};
    if (puzzleId === undefined || puzzleId === null || puzzleId === "") {
        return res.status(400).json({ message: "puzzleId is required" });
    }
    if (!gameId || !gameDay || !Array.isArray(cells)) {
        return res.status(400).json({ message: "puzzleId, gameId, gameDay and cells are required" });
    }
    const pid = Number(puzzleId);
    if (!Number.isInteger(pid) || pid <= 0) {
        return res.status(400).json({ message: "puzzleId must be a positive integer" });
    }
    const gsize = Number(gridSize);
    if (!Number.isInteger(gsize) || gsize <= 0) {
        return res.status(400).json({ message: "gridSize must be a positive integer" });
    }
    const conn = await db_1.puzzlePool.getConnection();
    try {
        await conn.beginTransaction();
        try {
            await conn.query(`INSERT INTO CURR_GAME (id, game_id, game_day, grid_size)
                 VALUES (?, ?, ?, ?)`, [pid, Number(gameId), gameDay, gsize]);
        }
        catch (err) {
            // Duplicate puzzleId — surface a clean 409.
            if (err && err.code === "ER_DUP_ENTRY") {
                await conn.rollback().catch(() => { });
                return res.status(409).json({ message: `puzzleId ${pid} already exists` });
            }
            throw err;
        }
        // Helper to coerce a *Rel into 1, 2, or null.
        const relOrNull = (v) => {
            const n = Number(v);
            return n === 1 || n === 2 ? n : null;
        };
        const colorsGrid = Array.isArray(cellColors) ? cellColors : [];
        const relsGrid = Array.isArray(cellRels) ? cellRels : [];
        // Build [puzzleId, row, col, value, color, topRel, rightRel, bottomRel, leftRel]
        // for every cell that has any data (value, color, or any *Rel set).
        const rowsToInsert = [];
        for (let r = 0; r < cells.length; r++) {
            const row = cells[r];
            if (!Array.isArray(row))
                continue;
            const colorRow = Array.isArray(colorsGrid[r]) ? colorsGrid[r] : [];
            const relRow = Array.isArray(relsGrid[r]) ? relsGrid[r] : [];
            for (let c = 0; c < row.length; c++) {
                const rawValue = row[c];
                const value = rawValue === undefined || rawValue === null || rawValue === ""
                    ? null
                    : String(rawValue);
                const rawColor = colorRow[c];
                const color = typeof rawColor === "string" && rawColor !== "" ? rawColor : null;
                const rel = relRow[c] || {};
                const topRel = relOrNull(rel.topRel);
                const rightRel = relOrNull(rel.rightRel);
                const bottomRel = relOrNull(rel.bottomRel);
                const leftRel = relOrNull(rel.leftRel);
                if (value === null && color === null &&
                    topRel === null && rightRel === null &&
                    bottomRel === null && leftRel === null)
                    continue;
                // @ts-ignore
                rowsToInsert.push([pid, gameId, r, c, value, color, topRel, rightRel, bottomRel, leftRel]);
            }
        }
        if (rowsToInsert.length > 0) {
            await conn.query(`INSERT INTO GAME_CELLS
                    (puzzle_id, game_id,row_num, col_num, value, color,
                     top_rel, right_rel, bottom_rel, left_rel)
                 VALUES ?`, [rowsToInsert]);
        }
        await conn.commit();
        res.status(200).json({
            message: "Puzzle saved",
            puzzleId: pid,
            cellCount: rowsToInsert.length,
        });
    }
    catch (err) {
        await conn.rollback().catch(() => { });
        console.error("Error saving puzzle:", err);
        res.status(500).json({ message: "Failed to save puzzle" });
    }
    finally {
        conn.release();
    }
};
exports.addPuzzle = addPuzzle;
//# sourceMappingURL=puzzle.js.map