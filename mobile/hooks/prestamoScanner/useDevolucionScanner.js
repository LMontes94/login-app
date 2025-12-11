import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { playBeep, playError } from "@/components/Sounds";
import { actualizarEstadoEquipo, getEquipoById } from "@/services/equipos.service";
import { devolverPrestamoPorEquipo } from "@/services/prestamo.service";
import { registrarActividad } from "@/services/actividad.service";
import { useNotificaciones } from "@/context/NotificacionContext";
import { enviarNotificacionPushLocal } from "@/lib/notificaciones";

export default function useDevolucionScanner(token) {
    const [scanned, setScanned] = useState(false);
    const { agregarNotificacion } = useNotificaciones();
    const router = useRouter();

    const resetScan = () => setScanned(false);

    const handleScan = async (id_equipo) => {
        if (scanned) return;
        setScanned(true);

        await playBeep();

        try {
            // Buscar préstamo activo del equipo
            const resPrestamo = await devolverPrestamoPorEquipo(token, id_equipo);
            if (!resPrestamo.ok) {
                await playError();
                Alert.alert("Error", resPrestamo.message || "No se encontró un préstamo activo para este equipo");
                setScanned(false);
                return;
            }

            // Actualizar estado del equipo a disponible (1)
            await actualizarEstadoEquipo(token, id_equipo, 1);

            // Obtener datos del equipo para notificación
            const equipo = await getEquipoById(token, id_equipo);
            if (!equipo) {
                await playError();
                Alert.alert("Error", "No se pudo obtener información del equipo");
                setScanned(false);
                return;
            }

            const detalle = `Devolución registrada: ${equipo.nombre} devuelto`;
            await registrarActividad(token, detalle);
            agregarNotificacion(detalle);
            await enviarNotificacionPushLocal(detalle);
            router.replace("/prestamos");

            Alert.alert("Éxito", "Devolución registrada correctamente");
        } catch (error) {
            await playError();
            console.error("Error handleScan devolucion:", error);
            Alert.alert("Error", "Ocurrió un error inesperado");
        } finally {
            setScanned(false);
        }
    };

    return { scanned, resetScan, handleScan };
}
