import { useEffect, useState } from "react";
import mqtt from "mqtt";

export interface UseMqttOptions {
  url: string;
  topic: string;
}

export function useMqtt({ url, topic }: UseMqttOptions) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const client = mqtt.connect(url);

    client.on("connect", () => {
      client.subscribe(topic);
    });

    client.on("message", (_topic, payload) => {
      setMessage(payload.toString());
    });

    return () => {
      client.end(true);
    };
  }, [url, topic]);

  return message;
}
