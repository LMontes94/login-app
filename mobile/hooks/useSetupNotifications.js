import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useSetupNotifications() {
    useEffect(() => {
        const init = async () => {
            try {
                // Pedir permisos al OS
                const { status } = await Notifications.requestPermissionsAsync();

                if (status !== "granted") {
                    console.log("Permiso de notificaciones denegado");
                }

                // Configurar cómo se muestran dentro de la app
                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowBanner: true,
                        shouldShowList: true,
                        shouldPlaySound: false,
                        shouldSetBadge: false,
                    }),
                });
            } catch (error) {
                console.log("Error configurando notificaciones:", error);
            }
        };

        init();
    }, []);
}
