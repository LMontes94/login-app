// routes/dashboard.routes.js
const express = require("express");
const router = express.Router();
const dashboardController = require("../src/controllers/dashboard.controller");

router.get("/stats", dashboardController.getStats);

module.exports = router;
