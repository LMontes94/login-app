// server.js
require("dotenv").config();
const app = require("./app");
import cron from "node-cron";
import { getPrestamosActivos } from "./services/prestamo.service.js";
import { enviarPushFinDeDia } from "./services/push.service.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
/*
cron.schedule(
    "0 18 * * 1-5",
    async () => {
        console.log("Chequeando préstamos activos...");

        const prestamos = await getPrestamosActivos();

        if (prestamos.length === 0) return;

        await enviarPushFinDeDia({
            cantidad: prestamos.length,
        });
    },
    {
        timezone: "America/Argentina/Buenos_Aires",
    }
);*/