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
}


module.exports = PrestamoController;
