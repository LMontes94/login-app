import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import PageLoader from "@/components/PageLoader";

function AppContent() {
  const { loading } = useAuth();

  if (loading) return <PageLoader />;

  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}