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
}

module.exports = PrestamoController;
