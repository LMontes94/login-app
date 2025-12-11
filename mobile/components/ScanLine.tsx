import { Animated } from "react-native";
import useScanLineAnimation from "@/hooks/prestamoScanner/useScanLineAnimation";
import { styles } from "@/assets/styles/scanner.styles";

export default function ScanLine({ maxHeight = 200, duration = 2000 }) {
  const translateY = useScanLineAnimation(maxHeight, duration);

  return <Animated.View style={[styles.line, { transform: [{ translateY }] }]} />;
}
