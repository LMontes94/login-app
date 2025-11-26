const db = require("../src/config/db");

async function main() {
    try {
        const conn = await db.getConnection();
        console.log("Conectado!");

        const [rows] = await conn.query("SELECT 1");
        console.log(rows);

        conn.release();
        process.exit();
    } catch (err) {
        console.error("Error al conectar:", err);
        process.exit(1);
    }
}

main();