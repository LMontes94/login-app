const express = require("express");
const auth = require("../src/middlewares/auth.middleware");
const PrestatarioController = require("../src/controllers/prestatarios.controller")

const router = express.Router();

router.get("/search", PrestatarioController.buscar);

module.exports = router;