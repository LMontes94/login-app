import { Stack, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { View } from "react-native";
import { useState } from "react";
export default function Layout() {
  const { user, loading } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false); 

  if (loading) return null;

  if (!user) return <Redirect href="/(auth)/sign-in" />;
  return (
    <View style={{ flex: 1 }}>
      <Header onOpenMenu={() => setMenuVisible(true)} />
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

