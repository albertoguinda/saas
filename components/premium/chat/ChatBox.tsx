"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";

import useSocket from "@/lib/hooks/useSocket";

export interface ChatMessage {
  id: number;
  text: string;
  sender: string;
}

export interface ChatBoxProps {
  wsUrl?: string;
}

export default function ChatBox({ wsUrl = "" }: ChatBoxProps) {
  const { data: session } = useSession();
  const t = useTranslations("chat");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const { send } = useSocket<ChatMessage>({
    url: wsUrl || undefined,
    onMessage: (msg) => setMessages((m) => [...m, msg]),
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!session) {
    return (
      <div className="space-y-2 rounded-md border border-default-200 p-4 text-center dark:border-default-600">
        <p>{t("loginPrompt")}</p>
        <Button color="primary" onClick={() => signIn()}>
          {t("signIn")}
        </Button>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();

    if (!value || !session.user?.name) return;
    const msg: ChatMessage = {
      id: Date.now(),
      text: value,
      sender: session.user.name,
    };

    setMessages((m) => [...m, msg]);
    send(msg);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-md border border-default-200 bg-white dark:border-default-600 dark:bg-neutral-900">
      <div ref={containerRef} className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.length ? (
          messages.map(({ id, text, sender }) => (
            <p
              key={id}
              className="max-w-xs rounded-md bg-default-200 p-2 text-sm text-default-800 dark:bg-default-700 dark:text-default-100"
            >
              <strong>{sender}: </strong>
              {text}
            </p>
          ))
        ) : (
          <p className="text-sm text-default-500">{t("empty")}</p>
        )}
      </div>
      <form
        className="flex gap-2 border-t border-default-200 p-2 dark:border-default-600"
        onSubmit={handleSubmit}
      >
        <Input
          className="flex-1"
          placeholder={t("placeholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button color="primary" type="submit">
          {t("send")}
        </Button>
      </form>
    </div>
  );
}
