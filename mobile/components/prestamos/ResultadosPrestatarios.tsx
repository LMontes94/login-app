import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/assets/styles/prestamo.styles";

export default function ResultadosPrestatario({ results, onSelect }) {
  return (
    <View style={{ marginTop: 10 }}>
      {results.map((p) => (
        <TouchableOpacity
          key={p.id_prestatario}
          style={styles.backButton}
          onPress={() => onSelect(p)}
        >
          <Text style={styles.backButtonText}>
            {p.nombre} {p.apellido}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
