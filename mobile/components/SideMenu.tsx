import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

export default function SideMenu({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.menu}>
          <Text style={styles.item}>Inicio</Text>
          <Text style={styles.item}>Mi Perfil</Text>
          <Text style={styles.item}>Ajustes</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  menu: {
    width: 250,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 5,
  },
  item: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
