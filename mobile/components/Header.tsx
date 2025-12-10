import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { BellIcon, MenuIcon } from "./Icons";
import { useAuth } from "@/context/AuthContext";
import { styles } from "@/assets/styles/home.styles";
import { useNotificaciones } from "@/context/NotificacionContext";

export default function Header({ onOpenMenu }) {
  const { user, logout } = useAuth();
  const { notificaciones, contador, marcarLeidas } = useNotificaciones();

  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const initials =
    (
      (user?.nombre?.charAt(0) || "") +
      (user?.apellido?.charAt(0) || "")
    ).toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <View style={styles.header}>
      {/* Burger */}
      <TouchableOpacity onPress={onOpenMenu}>
        <MenuIcon />
      </TouchableOpacity>

      {/* Espacio para centrar */}
      <View style={{ flex: 1 }} />

      {/* Campanita */}
      <TouchableOpacity
        style={styles.bellIconButton}
        onPress={() => {
          setShowNotifications(true);
          marcarLeidas();
        }}
      >
        <BellIcon />

        {contador > 0 && (
          <View style={styles.bellIcon}>
            <Text style={styles.notificationText}>
              {contador}
            </Text>
          </View>
        )}
      </TouchableOpacity>

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

      {/* Modal de notificaciones */}
      <Modal
        transparent
        visible={showNotifications}
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setShowNotifications(false)}
        >
          <View style={styles.menuNotificacion}>
            <Text style={styles.notificationTitle}>
              Notificaciones
            </Text>

            {notificaciones.length === 0 ? (
              <Text style={styles.sinNotificacionesText}>No hay notificaciones</Text>
            ) : (
              notificaciones.map((n) => (
                <Text key={n.id} style={{ marginBottom: 6 }}>
                  • {n.mensaje}
                </Text>
              ))
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
