const UsersService = require("../services/users.service");

class UsersController {
    static async getAll(req, res) {
        try {
            const data = await UsersService.getAll();
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al obtener usuarios" });
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const data = await UsersService.getById(id);

            if (!data) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al obtener usuario" });
        }
    }

    static async create(req, res) {
        try {
            const user = req.body;
            const newUser = await UsersService.create(user);
            res.json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al crear usuario" });
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const user = req.body;
            const updated = await UsersService.update(id, user);

            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al actualizar usuario" });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await UsersService.delete(id);

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al eliminar usuario" });
        }
    }
}

module.exports = UsersController;
