import { useEffect, useRef, useState } from "react";

export interface UseSocketOptions<T> {
  url?: string;
  onMessage?: (data: T) => void;
  mockInterval?: number;
  mockGenerator?: () => T;
}

export default function useSocket<T = unknown>({
  url,
  onMessage,
  mockInterval = 1000,
  mockGenerator,
}: UseSocketOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    if (url) {
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
    }

    if (process.env.NODE_ENV !== "production" && mockGenerator) {
      const id = setInterval(() => {
        const mock = mockGenerator();

        setData(mock);
        onMessage?.(mock);
      }, mockInterval);

      return () => clearInterval(id);
    }

    return undefined;
  }, [url, onMessage, mockGenerator, mockInterval]);

  const send = (payload: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    }
  };

  return { data, send };
}
