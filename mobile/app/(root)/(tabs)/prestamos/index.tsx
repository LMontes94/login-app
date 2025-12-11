import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { PlusIcon, ListIcon, CameraIcon } from "@/components/Icons";
import { styles } from "@/assets/styles/prestamo.styles";

export default function PrestamosMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Préstamos
      </Text>

      <Link href="/(root)/(tabs)/prestamos/(pages)/crear" asChild>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardRow}>
            <PlusIcon style={styles.icon} />
            <Text style={styles.cardText}>Crear préstamo</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/(root)/(tabs)/prestamos/(pages)/activos" asChild>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardRow}>
            <ListIcon style={styles.icon}/>
            <Text style={styles.cardText}>Ver préstamos activos</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/(root)/(tabs)/prestamos/(pages)/prestamoScanner" asChild>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardRow}>
            <CameraIcon style={styles.icon}/>
            <Text style={styles.cardText}>Crear préstamos con cámara</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/(root)/(tabs)/prestamos/(pages)/devolucionScanner" asChild>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardRow}>
            <CameraIcon style={styles.icon}/>
            <Text style={styles.cardText}>Devolución con cámara</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
