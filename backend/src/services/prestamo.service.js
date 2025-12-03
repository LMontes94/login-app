const db = require("../../config/db");

class PrestamoService {
    static async crearPrestamo({ id_usuario, id_prestatario, id_equipo }) {
        await db.query(
            `
            INSERT INTO Prestamos (id_usuario, id_prestatario, id_equipo, fecha, estado)
            VALUES (?, ?, ?, NOW(), 1)
            `,
            [id_usuario, id_prestatario, id_equipo]
        );

        return { ok: true };
    }

    static async getPrestamosActivos() {
        const [rows] = await db.query(`
            SELECT p.id_prestamo, p.fecha, u.nombre AS usuario, 
                   pr.nombre AS prestatario, e.nombre AS equipo
            FROM Prestamos p
            INNER JOIN Usuarios u ON u.id_usuario = p.id_usuario
            INNER JOIN Usuarios pr ON pr.id_usuario = p.id_prestatario
            INNER JOIN Equipos e ON e.id_equipo = p.id_equipo
            WHERE p.estado = 1
            ORDER BY p.fecha DESC
        `);

        return rows;
    }
}

module.exports = PrestamoService;
