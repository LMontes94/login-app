import { useState } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { playBeep, playError } from "@/components/Sounds";
import { createPrestamo } from "@/services/prestamo.service";
import { actualizarEstadoEquipo, getEquipoById } from "@/services/equipos.service";
import { getPrestatarioById } from "@/services/prestatario.service";
import { registrarActividad } from "@/services/actividad.service";
import { useNotificaciones } from "@/context/NotificacionContext";
import { enviarNotificacionPushLocal } from "@/lib/notificaciones";

export default function usePrestamoScanner(token) {
    const router = useRouter();
    const [step, setStep] = useState("prestatario");
    const [scanned, setScanned] = useState(false);

    const [prestatarioId, setPrestatarioId] = useState(null);
    const [equipoId, setEquipoId] = useState(null);
    const { agregarNotificacion } = useNotificaciones();
    const resetScan = () => {
        setScanned(false);
    };

    const handleScan = async (data) => {
        if (scanned) return;
        setScanned(true);

        // sonido de escaneo
        await playBeep();

        try {
            if (step === "prestatario") {
                setPrestatarioId(data);
                setStep("equipo");
                Alert.alert("Prestatario OK", `ID: ${data}`);
                return;
            }

            setEquipoId(data);
            Alert.alert("Equipo escaneado", `ID: ${data}`);

            if (!prestatarioId) {
                await playError();
                Alert.alert("Error", "No se escaneó un prestatario válido");
                return;
            }

            // Crear préstamo
            const res = await createPrestamo(token, {
                id_prestatario: prestatarioId,
                id_equipo: data,
            });
            //await actualizarEstadoEquipo(token, data, 2);

            const prestatario = await getPrestatarioById(token, prestatarioId);
            const equipo = await getEquipoById(token, data);

            const detalle = `Préstamo registrado: de ${equipo.nombre} a ${prestatario.apellido}, ${prestatario.nombre}`;
            await registrarActividad(token, detalle);

            agregarNotificacion(detalle);
            await enviarNotificacionPushLocal(detalle);

            router.replace("/prestamos");
            if (!res.ok) {
                await playError();
                Alert.alert("Error al crear préstamo", res.message);
            } else {
                Alert.alert("Éxito", "Préstamo creado correctamente");
                setStep("prestatario");
                setPrestatarioId(null);
                setEquipoId(null);
            }
        } catch (error) {
            await playError();
            console.error("Error handleScan:", error);
            Alert.alert("Error", "Ocurrió un error inesperado");
        }
    };

    return {
        step,
        scanned,
        resetScan,
        handleScan,
    };
}
