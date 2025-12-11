import { Text } from "react-native";
import { styles } from "@/assets/styles/scanner.styles";
export default function StepMessage({ step }) {
  return (
    <Text style={styles.text}>
      {step === "prestatario"
        ? "Escaneá el QR del prestatario"
        : "Escaneá el QR del equipo"}
    </Text>
  );
}

