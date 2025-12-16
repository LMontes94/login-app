const express = require("express");
const auth = require("../src/middlewares/auth.middleware");
const EquipoController = require("../src/controllers/equipo.controller");

const router = express.Router();

router.get("/search", EquipoController.buscarEquipo);
router.get("/activos", auth, EquipoController.getEquiposActivos);
router.get('/disponibles',EquipoController.listarEquiposDisponibles);
router.put("/estado/:id", EquipoController.cambiarEstadoEquipo);
router.get("/:id", auth, EquipoController.getEquipoById);

module.exports = router;