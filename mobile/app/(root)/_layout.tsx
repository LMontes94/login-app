import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Redirect href="/(auth)/sign-in" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}

