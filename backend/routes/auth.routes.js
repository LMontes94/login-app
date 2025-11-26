const express = require("express");
const { login } = require("../src/controllers/auth.controller");

const router = express.Router();

router.post("/login", login);

module.exports = router;

