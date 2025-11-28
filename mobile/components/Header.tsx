import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/assets/styles/home.styles";

export default function Header({ onOpenMenu }) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const initials = (
      (user?.nombre?.charAt(0) || "") +
      (user?.apellido?.charAt(0) || "")
    ).toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <View style={styles.header}>
      {/* Burger */}
      <TouchableOpacity onPress={onOpenMenu}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      {/* Espacio para centrar (opcional) */}
      <View style={{ flex: 1 }} />

      {/* Avatar */}
      <TouchableOpacity onPress={() => setShowMenu(true)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </TouchableOpacity>

      {/* Menu flotante */}
      <Modal
        transparent
        visible={showMenu}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setShowMenu(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                logout();
              }}
            >
              <Text style={styles.menuText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}