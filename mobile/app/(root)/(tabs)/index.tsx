import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import PageLoader from "../../../components/PageLoader";
import { styles } from "@/assets/styles/home.styles";
import { getDashboardStats } from "@/services/dashboard.service";
import DashboardCard from "@/components/StatCard";

export default function Page() {
  const { user, token, loading } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [stats, setStats] = useState(null);

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

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log("Error cargando stats:", error);
    }
  };

  if (!stats) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Header onOpenMenu={() => setMenuVisible(true)} />

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

      <View style={styles.welcomeContainer}>
        <Text style={styles.usernameText}>Hola {user?.email}</Text>
      </View>

      <View style={styles.content}>
        
        <DashboardCard
          title="Usuarios"
          count={stats.usuarios}
          icon="person"
        />
        
        <DashboardCard
          title="Prestatarios"
          count={stats.prestatarios}
          icon="people"
        />

        <DashboardCard
          title="Equipos"
          count={stats.equipos}
          icon="cube"
        />        
      </View>
    </View>
  );
}
