import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { createPrestamo } from "@/services/prestamo.service";
import { useAuth } from "@/context/AuthContext";

export default function CrearPrestamoScreen() {
  const { token } = useAuth();
  const [idPrestatario, setIdPrestatario] = useState("");
  const [idEquipo, setIdEquipo] = useState("");
  const [step, setStep] = useState(1);

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
    <View style={{ padding: 18 }}>
      {step === 1 && (
        <>
          <Text>Ingresá el ID del prestatario:</Text>
          <TextInput
            value={idPrestatario}
            onChangeText={setIdPrestatario}
            keyboardType="numeric"
            style={{ borderWidth: 1, padding: 8, marginTop: 8 }}
          />
          <Button title="Continuar" onPress={() => setStep(2)} />
        </>
      )}

      {step === 2 && (
        <>
          <Text>Ingresá el ID del equipo:</Text>
          <TextInput
            value={idEquipo}
            onChangeText={setIdEquipo}
            keyboardType="numeric"
            style={{ borderWidth: 1, padding: 8, marginTop: 8 }}
          />
          <Button title="Crear préstamo" onPress={confirmar} />
          <Button title="Volver" onPress={() => setStep(1)} />
        </>
      )}
    </View>
  );
}
