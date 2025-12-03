import { View, Text } from "react-native";
import { styles } from "@/assets/styles/actividad.styles";
export default function ActividadItem({ usuario, detalle, fecha }) {
  return (
    <View style={styles.card}>
      <Text style={styles.usuario}>{usuario}</Text>
      <Text style={styles.detalle}>{detalle}</Text>
      <Text style={styles.fecha}>{new Date(fecha).toLocaleString()}</Text>
    </View>
  );
}

