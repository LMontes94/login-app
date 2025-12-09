const express = require("express");
const PrestamoController = require("../src/controllers/prestamo.controller");
const auth = require("../src/middlewares/auth.middleware");

const router = express.Router();

router.post("/create", auth, PrestamoController.crear);
router.get("/activos", PrestamoController.activos);
router.put("/devolver/:id", auth, PrestamoController.devolverPrestamo);

module.exports = router;
