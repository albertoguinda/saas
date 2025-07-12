import { useEffect, useRef, useState } from "react";

export interface UseWebSocketOptions<T> {
  url: string;
  onMessage?: (data: T) => void;
}

export default function useWebSocket<T = unknown>({
  url,
  onMessage,
}: UseWebSocketOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    if (!url) return undefined;
    const socket = new WebSocket(url);

    socketRef.current = socket;
    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        setData(parsed);
        onMessage?.(parsed);
      } catch {
        // ignore parse errors
      }
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);

  const send = (payload: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    }
  };

  return { data, send };
}
