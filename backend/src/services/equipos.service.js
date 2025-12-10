const db = require("../../config/db");

class EquiposService {
    static async getAll() {
        const [rows] = await db.query("SELECT * FROM equipos");
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query(
            "SELECT * FROM equipos WHERE id_equipo = ?",
            [id]
        );
        return rows[0] || null;
    }

    static async create(data) {
        const fields = ["nombre", "img", "estado"];
        const values = fields.map(f => data[f]);

        const [result] = await db.query(
            `INSERT INTO equipos (${fields.join(",")})
             VALUES (${fields.map(() => "?").join(",")})`,
            values
        );

        return { id_equipo: result.insertId, ...data };
    }

    static async update(id, data) {
        const fields = ["nombre", "img", "estado"];
        const values = fields.map(f => data[f]);
        values.push(id);

        await db.query(
            `UPDATE equipos SET 
                ${fields.map(f => `${f} = ?`).join(",")}
             WHERE id_equipo = ?`,
            values
        );

        return { id_equipo: id, ...data };
    }

    static async delete(id) {
        await db.query("DELETE FROM equipos WHERE id_equipo = ?", [id]);
        return { deleted: true };
    }

    static async getCount() {
        const [rows] = await db.query(
            "SELECT COUNT(*) AS total FROM equipos"
        );
        return rows[0].total;
    }

    static async buscarPorNombre(nombre) {
        try {
            const query = `
            SELECT *
            FROM equipos
            WHERE nombre LIKE ?
            `;

            const [rows] = await db.query(query, [`%${nombre}%`]);

            return { ok: true, data: rows };
        } catch (error) {
            console.error("Error en buscarPorNombre:", error);
            return { ok: false, error };
        }
    };

    static async actualizarEstadoEquipo(id_equipo, nuevoEstado) {
        try {
            const [result] = await db.query(
                "UPDATE equipos SET estado = ? WHERE id_equipo = ?",
                [nuevoEstado, id_equipo]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    };

    static async getEquiposActivos(query = "") {
        const search = `%${query}%`;

        const [rows] = await db.query(
            "SELECT * FROM equipos WHERE estado = 1 AND nombre LIKE ?",
            [search]
        );

        return rows;
    }

}

module.exports = EquiposService;
