const express = require("express");
const auth = require("../src/middlewares/auth.middleware");
const equipoController = require("../src/controllers/equipo.controller");

const router = express.Router();

router.get("/search", equipoController.buscarEquipo);

module.exports = router;