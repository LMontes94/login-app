import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function PrestamosMenu() {
  return (
    <View style={{ padding: 20, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Préstamos
      </Text>

      <Link href="/(tabs)/prestamos/crear" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            padding: 14,
            borderRadius: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>➕ Crear préstamo</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(tabs)/prestamos/activos" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            padding: 14,
            borderRadius: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>📋 Ver préstamos activos</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
