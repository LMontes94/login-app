const UsersService = require("./users.service");
const PrestatariosService = require("./prestatarios.service");
const EquiposService = require("./equipos.service");

class DashboardService {
    static async getStats() {
        const [usuarios, prestatarios, equipos] = await Promise.all([
            UsersService.getCount(),
            PrestatariosService.getCount(),
            EquiposService.getCount(),
        ]);

        return {
            usuarios,
            prestatarios,
            equipos,
        };
    }
}

module.exports = DashboardService;

