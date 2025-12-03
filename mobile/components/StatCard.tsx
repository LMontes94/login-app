import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { styles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";

export default function StatCard({ title, count, icon }) {
  return (
    <Animated.View
      entering={FadeInUp.duration(600)}
      exiting={FadeOut.duration(300)}
      style={styles.statCard}
    >
      <View style={styles.statCardContent}>
        <Text style={styles.statCardTitle}>{title}</Text>
        <Text style={styles.statCardValue}>{count}</Text>
      </View>

      <View style={styles.statCardIcon}>
        <Ionicons name={icon} size={26} color="#fff" />
      </View>
    </Animated.View>
  );
}
