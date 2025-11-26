const express = require("express");
const router = express.Router();

// Importar módulos de rutas
const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");

// Unificar rutas
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
