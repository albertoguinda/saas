export async function track(event: string, meta?: Record<string, unknown>) {
  try {
    const page = typeof window !== "undefined" ? window.location.pathname : "";
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, page, meta }),
    });
  } catch {
    // no-op on network errors
  }
}
