const DashboardService = require("../services/dashboard.service");

class DashboardController {
    static async getStats(req, res) {
        try {
            const stats = await DashboardService.getStats();
            res.json(stats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener estadísticas" });
        }
    }
}

module.exports = DashboardController;
