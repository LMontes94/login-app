const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function searchPrestatarios(token, query) {
  const res = await fetch(`${API_URL}/prestatario/search?query=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.ok ? data.data : [];
}

export async function getPrestatarioById(token, id_prestatario) {
  try {
    const res = await fetch(`${API_URL}/prestatario/${id_prestatario}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al obtener el prestatario");
    return await res.json();
  } catch (error) {
    console.error("getPrestatarioById:", error);
    return null;
  }
}