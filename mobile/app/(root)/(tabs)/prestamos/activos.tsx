import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getPrestamosActivos } from "@/services/prestamo.service";
import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/context/AuthContext";

export default function PrestamosActivosScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getPrestamosActivos(token);
      setItems(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <ScrollView style={{ padding: 14 }}>
      {items.map((p) => (
        <View
          key={p.id_prestamo}
          style={{
            backgroundColor: "#fff",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{p.prestatario}</Text>
          <Text>Equipo: {p.equipo}</Text>
          <Text>Fecha: {new Date(p.fecha).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
