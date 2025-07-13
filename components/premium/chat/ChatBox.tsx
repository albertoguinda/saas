"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import useSocket from "@/components/hooks/useSocket";

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
}

export interface ChatBoxProps {
  wsUrl: string;
}

export default function ChatBox({ wsUrl }: ChatBoxProps) {
  const { data: session } = useSession();
  const { data: incoming, send } = useSocket<ChatMessage>({ url: wsUrl });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (incoming) {
      setMessages((m) => [...m, incoming]);
    }
  }, [incoming]);

  const handleSend = () => {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      userId: session?.user.id ?? "",
    };

    send(msg);
    setMessages((m) => [...m, msg]);
    setText("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {messages.map(({ id, text: t, userId }) => (
          <p key={id}>
            <strong>{userId === session?.user.id ? "me" : userId}</strong>: {t}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-2 py-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="border px-2" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
