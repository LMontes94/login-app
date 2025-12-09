import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "@/assets/styles/prestamo.styles";

export default function ResultadosEquipos({ results, onSelect }) {
  return (
    <ScrollView>
    <View style={{ marginTop: 10 }}>
      {results.map((eq) => (
        <TouchableOpacity
          key={eq.id_equipo}
          style={[
            styles.backButton,
            eq.estado === 2 && { opacity: 0.5 }
          ]}
          disabled={eq.estado === 2}
          onPress={() => onSelect(eq)}
        >
          <Text style={styles.backButtonText}>
            {eq.nombre} {eq.estado === 2 ? "(Reservado)" : ""}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
}
