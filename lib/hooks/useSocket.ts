import { useEffect, useRef, useState } from "react";

export interface UseSocketOptions<T> {
  url?: string;
  onMessage?: (data: T) => void;
  onConnect?: () => void;
  onDisconnect?: (event: CloseEvent) => void;
  mockInterval?: number;
  mockGenerator?: () => T;
}

export default function useSocket<T = unknown>({
  url,
  onMessage,
  onConnect,
  onDisconnect,
  mockInterval = 1000,
  mockGenerator,
}: UseSocketOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    if (url) {
      const socket = new WebSocket(url);

      socketRef.current = socket;
      socket.onopen = () => {
        setConnected(true);
        onConnect?.();
      };

      socket.onclose = (event) => {
        setConnected(false);
        onDisconnect?.(event);
      };
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
  }, [url, onMessage, mockGenerator, mockInterval, onConnect, onDisconnect]);

  const send = (payload: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    }
  };

  return { data, send, connected };
}
