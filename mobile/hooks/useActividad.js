import { useAuth } from "@/context/AuthContext";
import { getAllActividades, createActividad } from "@/services/actividad.service";
import { useState, useEffect } from "react";

export function useActividad(autoLoad = false) {
    const { token } = useAuth();
    const [actividades, setActividades] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Obtener actividades
    const cargarActividades = async () => {
        try {
            setLoading(true);
            const res = await getAllActividades(token);
            if (res.ok) setActividades(res.data);
        } catch (error) {
            console.log("Error al cargar actividades:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Crear una actividad
    const registrarActividad = async (detalle) => {
        try {
            await createActividad(token, detalle);

            // Si querés refrescar después de crear:
            // await cargarActividades();
        } catch (error) {
            console.log("Error creando actividad:", error);
        }
    };

    // 🔹 Si autoLoad es true, carga automáticamente al montar
    useEffect(() => {
        if (autoLoad) cargarActividades();
    }, []);

    return {
        actividades,
        loading,
        cargarActividades,
        registrarActividad,
    };
}
