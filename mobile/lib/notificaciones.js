import * as Notifications from "expo-notifications";

export async function enviarNotificacionPushLocal(mensaje) {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Nuevo préstamo registrado",
                body: mensaje,
                sound: "default",
            },
            trigger: null,
        });
    } catch (error) {
        console.log("Error enviando notificación:", error);
    }
}
