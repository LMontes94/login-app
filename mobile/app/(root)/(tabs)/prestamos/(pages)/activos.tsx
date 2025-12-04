import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getPrestamosActivos } from "@/services/prestamo.service";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/assets/styles/prestamo.styles";
import { formatDate } from "@/lib/utils";

export default function PrestamosActivosScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      try {
        const data = await getPrestamosActivos(token);
        setItems(data);
      } catch (error) {
        console.log("Error cargando préstamos activos:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  if (loading) return <PageLoader />;
  
   if (!items.length) {
    return (
      <View style={ styles.sinActividadContainer}>
        <Text style={ styles.sinActividadContainer} >
          No hay préstamos activos
        </Text>
        <Text style={ styles.sinActividadContainer} >
          Cuando se cree un préstamo, aparecerá aquí.
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(root)/(tabs)/prestamos")} >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(root)/(tabs)/prestamos")} >
          <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      {items.map((p) => (
        <View
          key={p.id_prestamo}
          style={styles.container}
        >
          <Text style={styles.prestatarioText}>{p.prestatario}</Text>
          <Text style={styles.equipoText}>Equipo: {p.equipo}</Text>
          <Text style={styles.dateText}>Fecha: {formatDate(p.fecha)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
