const EquipoService = require("../services/equipos.service");

class EquipoController {
    static async buscarEquipo(req, res) {
        const { nombre } = req.query;

        if (!nombre) {
            return res.json({
                ok: false,
                msg: "Falta el parámetro 'nombre'"
            });
        }

        const result = await EquipoService.buscarPorNombre(nombre);

        if (!result.ok) {
            return res.json({
                ok: false,
                msg: "Error buscando equipo",
                error: result.error
            });
        }

        return res.json({
            ok: true,
            data: result.data
        });
    }

    static async cambiarEstadoEquipo(req, res) {
        const { id } = req.params;
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ ok: false, message: "Falta el estado" });
        }

        try {
            const actualizado = await EquipoService.actualizarEstadoEquipo(id, estado);

            if (!actualizado) {
                return res.status(404).json({ ok: false, message: "Equipo no encontrado" });
            }

            res.json({ ok: true, message: "Estado actualizado" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, message: "Error actualizando estado de equipo" });
        }
    }

    static async getEquiposActivos(req, res) {
        try {
            const query = req.query.q || "";
            const equipos = await EquipoService.getEquiposActivos(query);

            res.json({
                ok: true,
                data: equipos
            });
        } catch (error) {
            console.error("Error obteniendo equipos activos:", error);
            res.status(500).json({
                ok: false,
                message: "Error obteniendo equipos activos"
            });
        }
    }

    static async getEquipoById(req, res) {
        const { id } = req.params;
        const equipo = await EquipoService.getById(id);
        if (!equipo) return res.status(404).json({ message: "Equipo no encontrado" });
        res.json(equipo);
    }
}

module.exports = EquipoController;