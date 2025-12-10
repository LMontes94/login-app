import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import BuscarPrestatario from "@/components/prestamos/BuscarPrestatario";
import ResultadosPrestatario from "@/components/prestamos/ResultadosPrestatarios";
import SeleccionarEquipo from "@/components/prestamos/SeleccionarEquipo";
import ResultadosEquipos from "@/components/prestamos/ResultadosEquipo"
import { useBuscarPrestatarios } from "@/hooks/useBuscarPrestatario";
import { useBuscarEquipos } from "@/hooks/useBuscarEquipos";
import { createPrestamo } from "@/services/prestamo.service";
import { styles } from "@/assets/styles/prestamo.styles";
import { BackIcon } from "@/components/Icons";
import { registrarActividad } from "@/services/actividad.service";
import { actualizarEstadoEquipo } from "@/services/equipos.service";
import { useNotificaciones } from "@/context/NotificacionContext";
import { enviarNotificacionPushLocal } from "@/lib/notificaciones";

export default function CrearPrestamoScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const [step, setStep] = useState(1);

  const [queryPrestatario, setQueryPrestatario] = useState("");
  const prestatarios = useBuscarPrestatarios(token, queryPrestatario);
  const [selectedPrestatario, setSelectedPrestatario] = useState(null);

  const [queryEquipo, setQueryEquipo] = useState("");
  const equipos = useBuscarEquipos(token, queryEquipo);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const { agregarNotificacion } = useNotificaciones();

  const confirmarPrestamo = async () => {
    if (!selectedPrestatario) {
    alert("Debe seleccionar un prestatario antes de continuar.");
    return;
  }

  if (!selectedEquipo) {
    alert("Debe seleccionar un equipo antes de confirmar el préstamo.");
    return;
  }
    const res = await createPrestamo(token, {
      id_prestatario: selectedPrestatario.id_prestatario,
      id_equipo: selectedEquipo.id_equipo,
    });

    if (!res.ok) {
      alert(res.message);
      return;
    }

    await actualizarEstadoEquipo(token, selectedEquipo.id_equipo, 2);

    const detalle = `Préstamo registrado: de ${selectedEquipo.nombre} a ${selectedPrestatario.apellido}, ${selectedPrestatario.nombre}`;
    await registrarActividad(token,detalle);

    agregarNotificacion(detalle);
    await enviarNotificacionPushLocal(detalle);
    router.push("/(root)/(tabs)/prestamos");
  };

  return (
    <View style={styles.container}>
      {/* Paso 1 */}
      {step === 1 && (
        <>
          <BuscarPrestatario
            value={queryPrestatario}
            onChange={setQueryPrestatario}
          />

          <ResultadosPrestatario
            results={prestatarios}
            onSelect={(p) => {
              setSelectedPrestatario(p);
              setStep(2);
            }}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/(root)/(tabs)/prestamos")}
          >
            <Text style={styles.backButtonText}><BackIcon /></Text>
          </TouchableOpacity>
        </>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <>
          <Text style={styles.titleText}>
            Prestatario seleccionado:{" "}
            {selectedPrestatario?.nombre} {selectedPrestatario?.apellido}
          </Text>

          <SeleccionarEquipo
            value={queryEquipo}
            onChange={setQueryEquipo}
          />

          <ResultadosEquipos
            results={equipos}
            onSelect={(eq) => {
              setSelectedEquipo(eq);
              setStep(3);
            }}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(1)}
          >
            <Text style={styles.backButtonText}><BackIcon /></Text>
          </TouchableOpacity>
        </>
      )}

      {/* Paso 3 */}
      {step === 3 && (
        <>
          <Text style={styles.titleText}>Confirmación</Text>

          <Text>Prestatario: {selectedPrestatario.nombre} {selectedPrestatario.apellido}</Text>
          <Text>Equipo: {selectedEquipo.nombre}</Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={confirmarPrestamo}
          >
            <Text style={styles.backButtonText}>Confirmar préstamo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(2)}
          >
            <Text style={styles.backButtonText}><BackIcon /></Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
