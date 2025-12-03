import { useEffect, useState } from "react";
import { 
    FlatList,
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import ActividadItem from "@/components/ActividadItem";
import { getActividades } from "@/services/actividad.service"
import PageLoader from "@/components/PageLoader";
import { styles } from "@/assets/styles/actividad.styles";

export default function ActividadScreen() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getActividades();
        const data = res?.ok ? res.data : res;
        setItems(data);
      } catch (err) {
        console.log("Error cargando actividades:",err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  if (loading) return <PageLoader/>;

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisibleCount((prev) =>
      prev === 10 ? items.length : 10
    );
  };

  const isShowingAll = visibleCount >= items.length;

  return (
    <View style={{ flex: 1, padding: 14 }}>
      <Text style={styles.titleText}>Actividades</Text>
      <FlatList
        data={items.slice(0, visibleCount)}
        keyExtractor={(item) => item.id_actividad.toString()}
        renderItem={({ item }) => (
          <ActividadItem
            usuario={item.usuario}
            detalle={item.detalle}
            fecha={item.fecha}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Botón Ver más / Ver menos */}
      {items.length > 10 && (
        <TouchableOpacity
          onPress={handleToggle}
          style={styles.seeMoreButton}
        >
          <Text
            style={styles.seeMoreButtonText}
          >
            {isShowingAll ? "Ver menos" : "Ver más"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
