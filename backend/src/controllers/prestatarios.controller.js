const PrestatarioService = require("../services/prestatarios.service");

class PrestatarioController {
    static async buscar(req, res) {
        try {
            const { query } = req.query;

            if (!query) {
                return res.json({ ok: true, data: [] });
            }

            const data = await PrestatarioService.buscar(query);
            return res.json({ ok: true, data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ ok: false, error: "Error buscando prestatarios" });
        }
    }

    static async getPrestatarioById(req, res) {
        const { id } = req.params;
        const prestatario = await PrestatarioService.getById(id);
        if (!prestatario) return res.status(404).json({ message: "Prestatario no encontrado" });
        res.json(prestatario);
    }

}

module.exports = PrestatarioController;
