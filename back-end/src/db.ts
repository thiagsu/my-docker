// @ts-ignore
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "S0ccer123",
    database: process.env.DB_NAME || "soccer",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Return DATE / DATETIME / TIMESTAMP columns as strings so values
    // are not shifted by the JS Date timezone conversion when serialized.
    dateStrings: true,
});

// Separate pool for the puzzle database. Falls back to the same host /
// credentials as the soccer DB unless overridden via PUZZLE_DB_* env vars.
const puzzlePool = mysql.createPool({
    host: process.env.PUZZLE_DB_HOST || process.env.DB_HOST || "localhost",
    port: Number(process.env.PUZZLE_DB_PORT || process.env.DB_PORT || 3306),
    user: process.env.PUZZLE_DB_USER || process.env.DB_USER || "root",
    password: process.env.PUZZLE_DB_PASSWORD || process.env.DB_PASSWORD || "S0ccer123",
    database: process.env.PUZZLE_DB_NAME || "puzzle",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true,
});

// @ts-ignore
export { puzzlePool };
// @ts-ignore
export default pool;



