/**
 * Send a tracking event from the client.
 *
 * @param event - Event name to record
 * @example
 * ```ts
 * await track('wizard_completed');
 * ```
 */
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

/**
 * Store a tracking event on the server.
 *
 * @param userId - User identifier
 * @param event - Event name to record
 */
export async function trackServer(userId: string, event: string) {
  try {
    const { default: dbConnect } = await import("@/lib/dbConnect");
    const { default: Event } = await import("@/lib/models/event");

    await dbConnect();
    await Event.create({ userId, event });
  } catch {
    // ignore tracking errors on server
  }
}
