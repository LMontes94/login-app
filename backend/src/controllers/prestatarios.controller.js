const PrestatarioService = require("../services/prestatarios.service");

class PrestatarioController{
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
    
}

module.exports = PrestatarioController;
