const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const buscarEquipos = async (token, nombre) => {
  if (!nombre) return [];

  const resp = await fetch(
    `${API_URL}/equipo/search?nombre=${nombre}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  const json = await resp.json(); // ← IMPORTANTE

  return json.data; // tu backend devuelve { ok, data }
};

export async function actualizarEstadoEquipo(token, id_equipo, estado) {
  try {
    const res = await fetch(`${API_URL}/equipo/estado/${id_equipo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error actualizando estado");

    return data;
  } catch (error) {
    console.error("EquipoService Error:", error);
    throw error;
  }
}

export async function getEquiposActivos(token, query = "") {
  try {
    const res = await fetch(`${API_URL}/equipo/activos?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.message || "Error obteniendo equipos activos");
    }

    return data.data;
  } catch (error) {
    console.error("EquiposActivosService Error:", error);
    throw error;
  }
}

export async function getEquipoById(token, id_equipo) {
  try {
    const res = await fetch(`${API_URL}/equipo/${id_equipo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener el equipo");
    return await res.json();
  } catch (error) {
    console.error("getEquipoById:", error);
    return null;
  }
}

export async function getEquiposDisponibles(token, query) {
  const res = await fetch(
    `${API_URL}/equipo/disponibles?search=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Error al obtener equipos disponibles");
  }

  return await res.json();
}
