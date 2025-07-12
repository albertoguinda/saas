import { Paperclip, SendHorizonal, Smile } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useSocket } from "@/lib/hooks/useSocket";

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChatBoxProps {
  user: ChatUser;
  channel: string;
  theme?: "light" | "dark";
}

const EMOJIS = ["😀", "😎", "🎉", "👍"];

/**
 * Real time chat box with optional file upload and emojis.
 */
export default function ChatBox({ user, channel, theme }: ChatBoxProps) {
  const { theme: appTheme } = useTheme();
  const t = useTranslations("chat");
  const { messages, sendMessage } = useSocket({ user: user.id, channel });
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const currentTheme = theme || appTheme;

  const handleSend = () => {
    if (!text && !file) return;
    const payload: { user: string; text?: string; file?: string } = {
      user: user.name,
    };

    if (text) payload.text = text;
    if (file) {
      payload.file = URL.createObjectURL(file);
    }
    sendMessage(payload);
    setText("");
    setFile(null);
  };

  return (
    <div
      className={cn(
        "rounded border flex flex-col w-full h-80",
        currentTheme === "dark" && "bg-neutral-800 text-white",
        currentTheme === "light" && "bg-white text-black",
      )}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className={cn(m.user === user.name && "text-right")}>
            {m.text && (
              <span className="inline-block bg-primary-500 text-white rounded px-2 py-1">
                {m.text}
              </span>
            )}
            {m.file && (
              <img
                alt="attachment"
                className="mt-1 max-w-xs rounded"
                src={m.file}
              />
            )}
          </div>
        ))}
      </div>
      <div className="relative p-2 border-t flex items-center gap-2">
        <button
          aria-label={t("emoji")}
          className="p-1 rounded hover:bg-default-100"
          type="button"
          onClick={() => setShowEmojis((v) => !v)}
        >
          <Smile size={20} />
        </button>
        {showEmojis && (
          <div className="absolute bottom-12 left-2 bg-white border rounded shadow p-2 flex gap-1">
            {EMOJIS.map((e) => (
              <button
                key={e}
                className="hover:bg-default-100 rounded p-1"
                type="button"
                onClick={() => {
                  setText((t) => t + e);
                  setShowEmojis(false);
                }}
              >
                {e}
              </button>
            ))}
          </div>
        )}
        <input
          className="hidden"
          id="chat-file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <label
          className="cursor-pointer p-1 rounded hover:bg-default-100"
          htmlFor="chat-file"
        >
          <Paperclip size={20} />
        </label>
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder={t("placeholder")}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          aria-label={t("send")}
          className="bg-primary-500 text-white rounded px-2 py-1"
          type="button"
          onClick={handleSend}
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
}
