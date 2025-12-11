import { Text, View, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import usePrestamoScanner from "@/hooks/prestamoScanner/usePrestamoScanner";
import StepMessage from "@/components/prestamos/StepMessage";
import CameraBlock from "@/components/CamaraBlock";
import BackButton from "@/components/BackButton";
import { styles } from "@/assets/styles/prestamo.styles"

export default function PrestamoScanner() {    
  const { token } = useAuth();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const { step, scanned, resetScan, handleScan } = usePrestamoScanner(token);

  if (!permission) return <View />;

  if (!permission.granted) {
    return <TouchableOpacity
                style={styles.backButton}
                onPress={requestPermission}
            >
                <Text style={styles.backButtonText}>Permitir camara</Text>
            </TouchableOpacity>
  }

  return (
    <View style={{ flex: 1 }}>
      <StepMessage step={step} />
      <BackButton onPress={() => router.push("/(root)/(tabs)/prestamos")} title={"Volver"}/>
      <CameraBlock onScan={handleScan} />

      {scanned && (
        <TouchableOpacity
            style={styles.backButton}
            onPress={resetScan}
        >
            <Text style={styles.backButtonText}>Volver a escanear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
