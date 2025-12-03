
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getDashboardStats() {
  try {

    const res = await fetch(`${API_URL}/dashboard/stats`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener estadísticas del dashboard");
    }

    return await res.json();
  } catch (error) {
    console.error("DashboardService Error:", error);
    throw error;
  }
}