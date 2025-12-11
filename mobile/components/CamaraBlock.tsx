import { View } from "react-native";
import { CameraView } from "expo-camera";
import { styles } from "@/assets/styles/scanner.styles";
import ScanLine from "./ScanLine";

export default function CameraBlock({ onScan }) {

  return (
    <View style={{ flex: 1 }}>
      {/* Cámara */}
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={({ data }) => onScan(data)}
      />

      {/* Overlay */}
      <View style={styles.overlayContainer}>
        <View style={styles.overlayTop} />

        <View style={styles.middleRow}>
          <View style={styles.overlaySide} />

          {/* Marco del QR */}
          <View style={styles.frame} />
            <ScanLine maxHeight={200} duration={2000}/>
          <View style={styles.overlaySide} />
        </View>

        <View style={styles.overlayBottom} />
      </View>
    </View>
  );
}
