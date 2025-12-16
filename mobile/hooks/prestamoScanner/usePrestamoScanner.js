import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { playBeep, playError } from "@/components/Sounds";
import { createPrestamo } from "@/services/prestamo.service";
import { getEquipoById } from "@/services/equipos.service";
import { getPrestatarioById } from "@/services/prestatario.service";
import { registrarActividad } from "@/services/actividad.service";
import { useNotificaciones } from "@/context/NotificacionContext";
import { enviarNotificacionPushLocal } from "@/lib/notificaciones";

export default function usePrestamoScanner(token) {
    const router = useRouter();

    const [step, setStep] = useState("prestatario");
    const [prestatarioId, setPrestatarioId] = useState(null);

    const scanLock = useRef(false); // 🔒 lock real
    const { agregarNotificacion } = useNotificaciones();

    const resetScan = () => {
        scanLock.current = false;
    };

    const handleScan = async (data) => {
        if (scanLock.current) return;
        scanLock.current = true;

        await playBeep();

        try {
            // ===== ESCANEO PRESTATARIO =====
            if (step === "prestatario") {
                setPrestatarioId(data);
                setStep("equipo");

                Alert.alert("Prestatario OK", `ID: ${data}`, [
                    {
                        text: "OK",
                        onPress: () => {
                            scanLock.current = false; // 🔓 liberar
                        },
                    },
                ]);

                return;
            }

            // ===== ESCANEO EQUIPO =====
            Alert.alert("Equipo escaneado", `ID: ${data}`, [
                {
                    text: "Confirmar",
                    onPress: async () => {
                        try {
                            const res = await createPrestamo(token, {
                                id_prestatario: prestatarioId,
                                id_equipo: data,
                            });

                            if (!res.ok) {
                                await playError();
                                Alert.alert("Error", res.message);
                                scanLock.current = false;
                                return;
                            }

                            const prestatario = await getPrestatarioById(token, prestatarioId);
                            const equipo = await getEquipoById(token, data);

                            const detalle = `Préstamo registrado: de ${equipo.nombre} a ${prestatario.apellido}, ${prestatario.nombre}`;

                            await registrarActividad(token, detalle);
                            agregarNotificacion(detalle);
                            await enviarNotificacionPushLocal(detalle);

                            Alert.alert("Éxito", "Préstamo creado correctamente", [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        setStep("prestatario");
                                        setPrestatarioId(null);
                                        scanLock.current = false;
                                        router.replace("/prestamos");
                                    },
                                },
                            ]);
                        } catch (err) {
                            await playError();
                            console.error(err);
                            Alert.alert("Error", "Ocurrió un error inesperado");
                            scanLock.current = false;
                        }
                    },
                },
            ]);
        } catch (error) {
            await playError();
            console.error("Error handleScan:", error);
            Alert.alert("Error", "Ocurrió un error inesperado");
            scanLock.current = false;
        }
    };

    return {
        step,
        handleScan,
        resetScan,
    };
}
