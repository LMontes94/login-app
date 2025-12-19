import { View, Text, TouchableOpacity} from "react-native";
import { useCameraPermissions } from "expo-camera";
import useDevolucionScanner from "@/hooks/prestamoScanner/useDevolucionScanner";
import StepMessage from "@/components/prestamos/StepMessage";
import CameraBlock from "@/components/CamaraBlock";
import { styles } from "@/assets/styles/prestamo.styles"
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
export default function DevolucionScanner() {
  const { token } = useAuth();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const { scanned, resetScan, handleScan } = useDevolucionScanner(token);
  
  if (!permission) return <View />;

  if (!permission.granted) {
    return <TouchableOpacity
                style={styles.backButton}
                onPress={requestPermission}
            >
                <Text style={styles.backButtonText}>Permitir camara</Text>
            </TouchableOpacity>;
    }

  return (
    <View style={{ flex: 1 }}>
      <StepMessage step="Escanee el equipo a devolver" />
      <BackButton onPress={() => router.push("/(root)/(tabs)/prestamos")} title={"Volver"}/>
      <CameraBlock onScan={handleScan} />
    </View>
  );
}
