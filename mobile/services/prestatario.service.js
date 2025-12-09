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
