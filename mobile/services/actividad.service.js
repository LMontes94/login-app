const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getActividades(token) {
    try {
        const res = await fetch(`${API_URL}/actividad/all`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) {
            throw new Error("Error al obtener estadísticas del dashboard");
        }

        return await res.json();
    } catch (error) {
        console.error("Actividad Service Error:", error);
        throw error;
    }
}

export async function registrarActividad(token, detalle) {
    try {
        const res = await fetch(`${API_URL}/actividad/registrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ detalle }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error("Error al crear actividad");

        return data;
    } catch (error) {
        console.error("ActividadService Error:", error);
        throw error;
    }
}