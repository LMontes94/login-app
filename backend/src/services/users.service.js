const db = require("../../config/db");

class UsersService {

    // ----------------------------------------------------
    // GET ALL USERS
    // ----------------------------------------------------
    static async getAll() {
        const [rows] = await db.query("SELECT * FROM usuarios");
        return rows;
    }

    // ----------------------------------------------------
    // GET USER BY ID
    // ----------------------------------------------------
    static async getById(id) {
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [id]
        );
        return rows[0] || null;
    }

    // ----------------------------------------------------
    // CREATE USER
    // ----------------------------------------------------
    static async create(user) {
        const fields = [
            "nombre",
            "apellido",
            "password",
            "descripcion",
            "id_usuario_tipo",
            "email",
            "estado"
        ];

        const values = fields.map(field => user[field]);

        const [result] = await db.query(
            `INSERT INTO usuarios (${fields.join(",")})
             VALUES (${fields.map(() => "?").join(",")})`,
            values
        );

        return { id_usuario: result.insertId, ...user };
    }

    // ----------------------------------------------------
    // UPDATE USER
    // ----------------------------------------------------
    static async update(id, user) {
        const fields = [
            "nombre",
            "apellido",
            "password",
            "descripcion",
            "id_usuario_tipo",
            "email",
            "estado"
        ];

        const values = fields.map(field => user[field]);
        values.push(id); // para el WHERE

        await db.query(
            `UPDATE usuarios SET 
                ${fields.map(f => `${f} = ?`).join(", ")}
             WHERE id_usuario = ?`,
            values
        );

        return { id_usuario: id, ...user };
    }

    // ----------------------------------------------------
    // DELETE USER
    // ----------------------------------------------------
    static async delete(id) {
        await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        return { deleted: true };
    }

    // ----------------------------------------------------
    // COUNT USERS
    // ----------------------------------------------------
    static async getCount() {
        const [rows] = await db.query(
            "SELECT COUNT(*) AS total FROM usuarios"
        );
        return rows[0].total;
    }
}

module.exports = UsersService;
