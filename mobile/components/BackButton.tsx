// components/BackButton.js
import { TouchableOpacity, Text } from "react-native";
import { BackIcon } from "./Icons";
import { styles } from "@/assets/styles/prestamo.styles";

export default function BackButton({ onPress, title = null }) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      {title ? (
        <Text style={styles.backButtonText}>{title}</Text>
      ) : (
        <BackIcon />
      )}
    </TouchableOpacity>
  );
}
