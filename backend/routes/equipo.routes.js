const express = require("express");
const auth = require("../src/middlewares/auth.middleware");
const EquipoController = require("../src/controllers/equipo.controller");

const router = express.Router();

router.get("/search", EquipoController.buscarEquipo);
router.get("/activos", EquipoController.getEquiposActivos);
router.put("/estado/:id", EquipoController.cambiarEstadoEquipo);

module.exports = router;