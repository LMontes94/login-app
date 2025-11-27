import { View, Text, Button } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";

export default function Page() {
  const { user, token, logout } = useAuth();

  // Si NO está logueado
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

  // Si está logueado
  return (
    <View>
      <Text>Hola {user?.email}</Text>

      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
