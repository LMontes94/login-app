const express = require("express");
const router = express.Router();
const ActividadController = require("../src/controllers/actividad.controller");
const auth = require("../src/middlewares/auth.middleware");

router.get("/all", ActividadController.getAll);
router.post("/registrar", auth, ActividadController.registrar);

module.exports = router;
