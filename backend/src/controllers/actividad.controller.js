const ActividadService = require("../services/actividad.service");

class ActividadController {

    static async getAll(req, res) {
        try {
            const data = await ActividadService.getAllActividades();
            res.json({ ok: true, data });
        } catch (error) {
            console.error("Error al obtener actividades:", error);
            res.status(500).json({ ok: false, message: "Error al obtener actividades" });
        }
    }

    static async registrar(req, res) {
        try {
            const { detalle } = req.body;
            const id_usuario = req.user.id_usuario;
            console.log("Detalle enviado:", detalle);
            if (!id_usuario || !detalle) {
                return res.status(400).json({ ok: false, message: "Faltan datos" });
            }

            const result = await ActividadService.crearActividad({ id_usuario, detalle });

            res.json({ ok: true, message: "Actividad registrada", result });
        } catch (error) {
            console.error("Error al crear actividad:", error);
            res.status(500).json({ ok: false, message: "Error al crear actividad" });
        }
    }

}

module.exports = ActividadController;
