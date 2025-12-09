import { useState, useEffect } from "react";
import { getEquiposActivos } from "@/services/equipos.service";

export function useBuscarEquipos(token, query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await getEquiposActivos(token, query);
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return results;
}
