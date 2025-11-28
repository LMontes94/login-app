import { useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

export default function Page() {
  const { user, token } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  if (!token) {
    return (
      <View>
        <Link href="/(auth)/sign-in">
          <Text>Iniciar sesión</Text>
        </Link>

        <Link href="/(auth)/sign-up">
          <Text>Registrarme</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <View style={{ padding: 20 }}>
        <Text>Hola {user?.email}</Text>
      </View>
    </View>
  );
}
