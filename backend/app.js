// app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", routes);

// Manejo de errores (middleware final)
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

module.exports = app;
