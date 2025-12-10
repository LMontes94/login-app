import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import PageLoader from "@/components/PageLoader";
import { NotificationProvider } from "@/context/NotificacionContext";
import { useSetupNotifications } from "@/hooks/useSetupNotifications";

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
  
  useSetupNotifications();
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
        <StatusBar style="dark" />
      </NotificationProvider>
    </AuthProvider>
  );
}