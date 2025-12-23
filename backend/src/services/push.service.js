import { Expo } from "expo-server-sdk";
import { getTokensAdmins } from "./token.service.js";
const expo = new Expo();

export async function enviarPushFinDeDia({ cantidad }) {
    const tokens = await getTokensAdmins();

    if (tokens.length === 0) return;

    const messages = tokens.map(token => ({
        to: token,
        sound: "default",
        title: "Préstamos pendientes",
        body: `Quedan ${cantidad} préstamos activos al cierre del día`,
    }));

    await expo.sendPushNotificationsAsync(messages);
}
