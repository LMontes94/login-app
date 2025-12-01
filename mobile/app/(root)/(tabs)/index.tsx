import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import PageLoader from "../../../components/PageLoader";
import { styles } from "@/assets/styles/home.styles";

export default function Page() {
  const { user, token, loading } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  if (loading) {
    return <PageLoader />;
  }
  
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
    <View style={styles.container}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <View style={styles.welcomeContainer}>
        <Text style={styles.usernameText}>Hola {user?.email}</Text>
      </View>
    </View>
  );
}
