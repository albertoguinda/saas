// lib/hooks/useSites.ts

import { useState, useEffect, useCallback } from "react";

// Define el tipo de sitio (mejor si lo importas del modelo)
export interface Site {
  _id: string;
  userId: string;
  slug: string;
  title: string;
  structure: any;
  createdAt: string;
  updatedAt: string;
}

// Hook para gestionar la lista de sitios del usuario autenticado
export function useSites() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Trae la lista de sitios al montar el componente
  const fetchSites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sites");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar los sitios");
      setSites(data.sites || []);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  // Llama una vez al montar
  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  // Para crear un sitio (llama al POST y refresca lista si va bien)
  const createSite = async (params: {
    title: string;
    slug: string;
    structure?: any;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear el sitio");
      await fetchSites(); // Refresca la lista si todo ok
      return { ok: true, site: data.site };
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    sites,
    loading,
    error,
    refresh: fetchSites,
    createSite,
  };
}
