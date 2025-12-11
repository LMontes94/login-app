const db = require("../../config/db");

class PrestamoService {
    static async crearPrestamo({ id_usuario, id_prestatario, id_equipo }) {
        await db.query(
            `
            INSERT INTO prestamos (id_usuario, id_prestatario, id_equipo, fecha, estado)
            VALUES (?, ?, ?, NOW(), 1)
            `,
            [id_usuario, id_prestatario, id_equipo]
        );

        return { ok: true };
    }

    static async getPrestamosActivos() {
        const [rows] = await db.query(`
        SELECT 
            p.id_prestamo,
            p.id_equipo,
            p.fecha,
            CONCAT(u.nombre, ' ', u.apellido) AS usuario,
            CONCAT(pr.nombre, ' ', pr.apellido) AS prestatario,
            e.nombre AS equipo
        FROM prestamos p
        INNER JOIN usuarios u ON u.id_usuario = p.id_usuario
        INNER JOIN prestatarios pr ON pr.id_prestatario = p.id_prestatario
        INNER JOIN equipos e ON e.id_equipo = p.id_equipo
        WHERE p.estado = 1
        ORDER BY p.fecha DESC
        `);

        return rows;
    }

    static async devolver(id) {
        try {
            const [result] = await db.query(
                `UPDATE prestamos SET estado = 0, fecha_devolucion = NOW() WHERE id_prestamo = ?`,
                [id]
            );

            return result.affectedRows > 0;
        } catch (err) {
            console.error("prestamoService.devolver error:", err);
            return false;
        }
    }

    static async getPrestamoActivoPorEquipo(id_equipo) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM prestamos WHERE id_equipo = ? AND estado = 1 LIMIT 1",
                [id_equipo]
            );

            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error("Error getPrestamoActivoPorEquipo:", error);
            throw new Error("Error al buscar el préstamo");
        }
    }

    static async devolverPrestamoPorEquipo(id_equipo) {
        try {
            const prestamo = await PrestamoService.getPrestamoActivoPorEquipo(id_equipo);
            if (!prestamo) return null;

            await db.query(
                "UPDATE prestamos SET estado = 0, fecha_devolucion = NOW() WHERE id_prestamo = ?",
                [prestamo.id_prestamo]
            );

            return prestamo;
        } catch (error) {
            console.error("Error devolverPrestamoPorEquipo:", error);
            throw new Error("Error al devolver el préstamo");
        }
    }
}

module.exports = PrestamoService;

