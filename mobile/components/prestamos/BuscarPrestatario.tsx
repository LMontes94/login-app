import { View, Text, TextInput } from "react-native";
import { styles } from "@/assets/styles/prestamo.styles";

export default function BuscarPrestatario({ value, onChange }) {
  return (
    <View>
      <Text style={styles.titleText}>Ingresá nombre o apellido:</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Escribí para buscar..."
        style={styles.inputPrestamo}
      />
    </View>
  );
}
