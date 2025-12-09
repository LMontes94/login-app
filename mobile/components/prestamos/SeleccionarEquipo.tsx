import { View, Text, TextInput } from "react-native";
import { styles } from "@/assets/styles/prestamo.styles";

export default function SeleccionarEquipo({ value, onChange }) {
  return (
    <View>
      <Text style={styles.titleText}>Ingresá el nombre del equipo:</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Buscar equipo..."
        style={styles.inputPrestamo}
      />
    </View>
  );
}
