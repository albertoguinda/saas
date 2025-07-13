import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import useWebSocket from "@/components/hooks/useWebSocket";

export interface ChatMessage {
  user: string;
  message: string;
}

export interface ChatProps {
  wsUrl: string;
  user: string;
}

export default function Chat({ wsUrl, user }: ChatProps) {
  const { data, send } = useWebSocket<ChatMessage>({ url: wsUrl });
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (data) {
      setHistory((h) => [...h, data]);
    }
  }, [data]);

  const handleSend = () => {
    if (message.trim()) {
      send({ user, message });
      setHistory((h) => [...h, { user, message }]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="h-40 overflow-y-auto border rounded p-2">
        {history.map((m, i) => (
          <p key={i} className="text-sm">
            <strong>{m.user}: </strong>
            {m.message}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
