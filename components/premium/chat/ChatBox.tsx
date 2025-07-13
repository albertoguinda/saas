"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export interface ChatMessage {
  id: number;
  text: string;
  sender?: "user" | "bot";
}

export interface ChatBoxProps {
  initialMessages?: ChatMessage[];
  onSend?: (text: string) => void;
  className?: string;
}

export default function ChatBox({
  initialMessages = [],
  onSend,
  className,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = input.trim();

    if (!value) return;
    const msg: ChatMessage = { id: Date.now(), text: value, sender: "user" };

    setMessages((m) => [...m, msg]);
    onSend?.(value);
    setInput("");
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`flex h-full flex-col ${className ?? ""}`}>
      <div
        ref={containerRef}
        className="flex-1 space-y-2 overflow-y-auto rounded-t-md border border-default-200 bg-white p-4 dark:border-default-600 dark:bg-neutral-900"
      >
        {messages.map(({ id, text, sender }) => (
          <div
            key={id}
            className={`max-w-xs rounded-md p-2 text-sm ${
              sender === "user"
                ? "ml-auto bg-primary-500 text-white"
                : "bg-default-200 text-default-800 dark:bg-default-700 dark:text-default-100"
            }`}
          >
            {text}
          </div>
        ))}
      </div>
      <form
        className="flex items-end gap-2 rounded-b-md border-x border-b border-default-200 bg-white p-2 dark:border-default-600 dark:bg-neutral-900"
        onSubmit={handleSubmit}
      >
        <Input
          className="flex-1"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button color="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
