const express = require("express");
const router = express.Router();
const UsersController = require("../src/controllers/users.controller");

// Obtener todos los usuarios
router.get("/all", UsersController.getAll);

// Obtener un usuario por ID
router.get("/:id", UsersController.getById);

// Crear usuario
router.post("/create", UsersController.create);

// Actualizar usuario
router.put("/update/:id", UsersController.update);

// Eliminar usuario
router.delete("/delete/:id", UsersController.delete);

module.exports = router;
