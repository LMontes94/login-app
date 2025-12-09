import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getPrestamosActivos, devolverPrestamo } from "@/services/prestamo.service";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/assets/styles/prestamo.styles";
import { formatDate } from "@/lib/utils";
import { BackIcon } from "@/components/Icons";
import { registrarActividad } from "@/services/actividad.service";
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
  const handleDevolver = async (prestamo) => {
    Alert.alert(
      "Confirmar devolución",
      "¿Seguro que el equipo fue devuelto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, devolver",
          onPress: async () => {
            try {  
              const ok = await devolverPrestamo(prestamo.id_prestamo, token);
              if (ok) {
                setItems(prev =>
                  prev.filter(p => p.id_prestamo !== prestamo.id_prestamo)
                );
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo devolver el préstamo");
            }
  
            try {
              const detalle = `Registró devolución de ${prestamo.equipo} de ${prestamo.prestatario}`;
              await registrarActividad(token, detalle);
            } catch (error) {
              console.log("Error registrando actividad:", error);
            }
          },
        },
      ]
    );
  };
  

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
          style={styles.cardActivos}
        >
          <View style={styles.cardInfo}>
            <Text style={styles.prestatarioText}>{p.prestatario}</Text>
            <Text style={styles.equipoText}>Equipo: {p.equipo}</Text>
            <Text style={styles.dateText}>Fecha: {formatDate(p.fecha)}</Text>
          </View>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => handleDevolver(p)}
            >
                <BackIcon style={styles.returnButtonText}/>
            </TouchableOpacity>
          
        </View>
      ))}
    </ScrollView>
  );
}
