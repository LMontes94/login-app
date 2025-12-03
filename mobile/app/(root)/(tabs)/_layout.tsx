import { HomeIcon, ActividadIcon } from "@/components/Icons";
import { COLORS } from "@/constants/colors";
import {Tabs,Redirect} from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function TabsLayout(){
  const { token, loading } = useAuth();

  if (loading) return null;

  if (!token) {
    return <Redirect href="/(auth)/sign-in" />;
  }
    return(
        <Tabs
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: "#999",
            }}
        >
        <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color}/>
          ),
        }}
      />
      <Tabs.Screen
         name="actividad"
          options={{
          title: "Actividad",
          tabBarIcon: ({ color }) => (
           <ActividadIcon color={color} />
          ),
        }}
      />
      </Tabs>
    );
}