export async function track(event: string) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
    });
  } catch {
    // ignore tracking errors
  }
}
