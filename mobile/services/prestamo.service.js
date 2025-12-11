const API_URL = process.env.EXPO_PUBLIC_API_URL;
export async function getPrestamosActivos(token) {
    try {
        const res = await fetch(`${API_URL}/prestamo/activos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Error cargando préstamos activos");

        const data = await res.json();
        return data.ok ? data.data : [];
    } catch (error) {
        console.error("getPrestamosActivos Error:", error);
        throw error;
    }
}

export async function createPrestamo(token, { id_prestatario, id_equipo }) {
    try {
        const res = await fetch(`${API_URL}/prestamo/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_prestatario,
                id_equipo,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                message: data.message || "Error al crear el préstamo",
            };
        }

        return { ok: true };
    } catch (error) {
        console.error("createPrestamo Error:", error);
        return {
            ok: false,
            message: "Error de conexión",
        };
    }
}

export async function devolverPrestamo(id, token) {
    try {
        const res = await fetch(`${API_URL}/prestamo/devolver/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("No se pudo devolver el préstamo");

        const data = await res.json();
        return data.ok;
    } catch (err) {
        console.error("devolverPrestamo Error:", err);
        throw err;
    }
}

export async function devolverPrestamoPorEquipo(token, id_equipo) {
    try {
        const res = await fetch(`${API_URL}/prestamo/devolver/equipo/${id_equipo}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("devolverPrestamoPorEquipo error:", error);
        return {
            ok: false,
            message: "Error de conexión"
        };
    }
}

