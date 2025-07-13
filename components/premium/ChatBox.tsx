"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

export default function ChatBox() {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, input.trim()]);
    setInput("");
  };

  return (
    <Card className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <div className="flex-1 overflow-y-auto border p-2 rounded-md h-48">
        {messages.length ? (
          messages.map((msg, i) => <p key={i}>{msg}</p>)
        ) : (
          <p className="text-sm text-gray-500">{t("empty")}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={t("placeholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button color="primary" onClick={handleSend}>
          {t("send")}
        </Button>
      </div>
    </Card>
  );
}
