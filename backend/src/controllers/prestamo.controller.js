const PrestamoService = require("../services/prestamo.service");

class PrestamoController {

    static async crear(req, res) {
        try {
            const { id_prestatario, id_equipo } = req.body;
            const id_usuario = req.user.id_usuario;

            const result = await PrestamoService.crearPrestamo({
                id_usuario,
                id_prestatario,
                id_equipo
            });

            if (!result.ok) {
                return res.status(400).json(result);
            }

            return res.json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, error: "Error al crear préstamo" });
        }
    }

    static async activos(req, res) {
        try {
            const data = await PrestamoService.getPrestamosActivos();
            return res.json({ ok: true, data });
        } catch (error) {
            return res.status(500).json({ ok: false, error: "Error al obtener préstamos" });
        }
    }

    static async devolverPrestamo(req, res) {
        try {
            const { id } = req.params;

            const ok = await PrestamoService.devolver(id);

            if (!ok) {
                return res.status(400).json({
                    ok: false,
                    message: "No se pudo devolver el préstamo",
                });
            }

            return res.json({
                ok: true,
                message: "Préstamo devuelto correctamente",
            });
        } catch (error) {
            console.error("Error devolver préstamo:", error);
            return res.status(500).json({
                ok: false,
                message: "Error interno",
            });
        }
    }

    static async devolverPrestamoPorEquipo(req, res) {
        try {
            const { id_equipo } = req.params;

            const prestamo = await PrestamoService.devolverPrestamoPorEquipo(id_equipo);

            if (!prestamo) {
                return res.status(404).json({
                    ok: false,
                    message: "No existe un préstamo activo para este equipo",
                });
            }

            res.json({
                ok: true,
                message: "Préstamo devuelto correctamente",
                prestamo,
            });
        } catch (error) {
            console.error("Controller devolverPrestamoPorEquipo:", error);
            res.status(500).json({
                ok: false,
                message: "Error al devolver el préstamo",
            });
        }
    }
}


module.exports = PrestamoController;
