import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity  } from "react-native";
import { createPrestamo } from "@/services/prestamo.service";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/assets/styles/prestamo.styles";
import { useRouter } from "expo-router";
export default function CrearPrestamoScreen() {
  const { token } = useAuth();
  const [idPrestatario, setIdPrestatario] = useState("");
  const [idEquipo, setIdEquipo] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const confirmar = async () => {
    await createPrestamo(token, {
      id_prestatario: idPrestatario,
      id_equipo: idEquipo,
    });
    alert("Préstamo registrado");
    setIdEquipo("");
    setIdPrestatario("");
    setStep(1);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>         
          <Text style={styles.titleText}>Ingresá el ID del prestatario:</Text>
          <TextInput
            value={idPrestatario}
            onChangeText={setIdPrestatario}
            keyboardType="numeric"
            style={styles.inputPrestamo}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => setStep(2)} >
            <Text style={styles.backButtonText}>Continuar</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(root)/(tabs)/prestamos")} >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.titleText}>Ingresá el ID del equipo:</Text>
          <TextInput
            value={idEquipo}
            onChangeText={setIdEquipo}
            keyboardType="numeric"
            style={styles.inputPrestamo}
          />
          <TouchableOpacity style={styles.backButton} onPress={confirmar} >
            <Text style={styles.backButtonText}>Confirmar préstamo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)} >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
