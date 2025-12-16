import { useState, useEffect } from "react";
import { getEquiposDisponibles } from "@/services/equipos.service";

export function useBuscarEquiposDisponibles(token, query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await getEquiposDisponibles(token, query);
        setResults(data ?? []);
      } catch (error) {
        console.log("Error buscando equipos:", error);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, token]); // ⬅️ agregamos token

  return results;
}
