const db = require("../../config/db");

class PrestatariosService {
    // Obtener todos
    static async getAll() {
        const [rows] = await db.query("SELECT * FROM prestatarios");
        return rows;
    }

    // Obtener por ID
    static async getById(id) {
        const [rows] = await db.query(
            "SELECT * FROM prestatarios WHERE id_prestatario = ?",
            [id]
        );
        return rows[0] || null;
    }

    // Crear prestatario
    static async create(data) {
        const fields = [
            "id_prestatario_tipo",
            "id_seccion",
            "nombre",
            "apellido",
            "email",
            "img",
            "descripcion",
            "estado"
        ];

        const values = fields.map(f => data[f]);

        const [result] = await db.query(
            `INSERT INTO prestatarios (${fields.join(",")})
             VALUES (${fields.map(() => "?").join(",")})`,
            values
        );

        return { id_prestatario: result.insertId, ...data };
    }

    // Actualizar prestatario
    static async update(id, data) {
        const fields = [
            "id_prestatario_tipo",
            "id_seccion",
            "nombre",
            "apellido",
            "email",
            "img",
            "descripcion",
            "estado"
        ];

        const values = fields.map(f => data[f]);
        values.push(id);

        await db.query(
            `UPDATE prestatarios SET 
                ${fields.map(f => `${f} = ?`).join(",")}
            WHERE id_prestatario = ?`,
            values
        );

        return { id_prestatario: id, ...data };
    }

    // Eliminar
    static async delete(id) {
        await db.query("DELETE FROM prestatarios WHERE id_prestatario = ?", [id]);
        return { deleted: true };
    }

    // Obtener cantidad
    static async getCount() {
        const [rows] = await db.query(
            "SELECT COUNT(*) AS total FROM prestatarios"
        );
        return rows[0].total;
    }

    static async buscar(query) {
        const [rows] = await db.query(`
            SELECT id_prestatario, nombre, apellido
                FROM prestatarios
            WHERE estado = 1
            AND (nombre LIKE ? OR apellido LIKE ?)
            LIMIT 10
            `, [`%${query}%`, `%${query}%`]);

        return rows;
    }

}

module.exports = PrestatariosService;

