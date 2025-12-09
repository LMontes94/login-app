import { useState, useEffect } from "react";
import { searchPrestatarios } from "@/services/prestatario.service";

export function useBuscarPrestatarios(token, query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await searchPrestatarios(token, query);
      setResults(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return results;
}
