const express = require("express");
const router = express.Router();
const ActividadController = require("../src/controllers/actividad.controller");

// GET /actividad
router.get("/all", ActividadController.getAll);

// POST /actividad
router.post("/create", ActividadController.crear);

module.exports = router;
