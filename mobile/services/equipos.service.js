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