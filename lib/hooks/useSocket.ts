import { useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id: string;
  user: string;
  text?: string;
  file?: string;
}

export interface UseSocketOptions {
  user: string;
  channel: string;
  mock?: boolean;
}

// Simple EventTarget based mock server for local development
const mockServer = typeof window !== "undefined" ? new EventTarget() : null;

export function useSocket({ user, channel, mock = true }: UseSocketOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!mock && typeof window !== "undefined" && "WebSocket" in window) {
      const url =
        (process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001") +
        `/${channel}`;
      const ws = new WebSocket(url);

      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data) as ChatMessage;

          setMessages((m) => [...m, msg]);
        } catch {}
      };
      wsRef.current = ws;

      return () => ws.close();
    }

    if (mockServer) {
      const handler = (e: Event) => {
        const detail = (e as CustomEvent<ChatMessage>).detail;

        if (detail.user !== user) {
          setMessages((m) => [...m, detail]);
        }
      };

      mockServer.addEventListener(channel, handler as EventListener);

      return () =>
        mockServer.removeEventListener(channel, handler as EventListener);
    }
  }, [channel, mock, user]);

  const sendMessage = (msg: Omit<ChatMessage, "id">) => {
    const final = { ...msg, id: Date.now().toString() };

    setMessages((m) => [...m, final]);
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(final));
    } else if (mockServer) {
      mockServer.dispatchEvent(new CustomEvent(channel, { detail: final }));
    }
  };

  return { messages, sendMessage };
}
