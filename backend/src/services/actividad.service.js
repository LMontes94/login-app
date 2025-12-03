const db = require("../../config/db");

class ActividadService {

    static async getAllActividades() {
        const [rows] = await db.query(
            `
            SELECT a.id_actividad, a.detalle, a.fecha, u.nombre AS usuario
            FROM actividad a
            INNER JOIN usuarios u ON u.id_usuario = a.id_usuario
            WHERE a.estado = 1
            ORDER BY a.fecha DESC
            `
        );

        return rows;
    };

    static async crearActividad({ id_usuario, detalle }) {
        await db.query(
            `
            INSERT INTO Actividad (id_usuario, detalle, fecha, estado)
            VALUES (?, ?, NOW(), 1)
            `,
            [id_usuario, detalle]
        );

        return { ok: true };
    };

}

module.exports = ActividadService;