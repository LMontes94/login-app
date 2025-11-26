const db = require("../../config/db");

class UsersService {
    static async getAll() {
        const [rows] = await db.query("SELECT * FROM usuarios");
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [id]
        );
        return rows[0];
    }

    static async create(user) {
        const { nombre, apellido, password, descripcion, id_usuario_tipo, email, estado } = user;

        const [result] = await db.query(
            `INSERT INTO usuarios 
                (nombre, apellido, password, descripcion, id_usuario_tipo, email, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, password, descripcion, id_usuario_tipo, email, estado]
        );

        return { id_usuario: result.insertId, ...user };
    }

    static async update(id, user) {
        const { nombre, apellido, password, descripcion, id_usuario_tipo, email, estado } = user;

        await db.query(
            `UPDATE usuarios SET 
                nombre = ?, 
                apellido = ?, 
                password = ?, 
                descripcion = ?, 
                id_usuario_tipo = ?, 
                email = ?, 
                estado = ?
            WHERE id_usuario = ?`,
            [nombre, apellido, password, descripcion, id_usuario_tipo, email, estado, id]
        );

        return { id_usuario: id, ...user };
    }

    static async delete(id) {
        await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
        return { deleted: true };
    }
}

module.exports = UsersService;
