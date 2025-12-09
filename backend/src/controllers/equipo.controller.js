const EquipoService = require("../services/equipos.service");

class EquipoController{
    static async buscarEquipo(req, res){
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
}

module.exports = EquipoController;