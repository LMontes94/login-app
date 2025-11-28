import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    elevation: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 5,
    width: 150,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});
