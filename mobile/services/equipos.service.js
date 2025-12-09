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
