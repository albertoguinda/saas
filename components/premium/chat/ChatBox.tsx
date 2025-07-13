"use client";

import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();

    if (!value) return;
    setMessages((m) => [...m, value]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-md border border-default-200 bg-white dark:border-default-600 dark:bg-neutral-900">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <p
            key={index}
            className="max-w-xs rounded-md bg-default-200 p-2 text-sm text-default-800 dark:bg-default-700 dark:text-default-100"
          >
            {message}
          </p>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-default-200 p-2 dark:border-default-600"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-1 rounded-md border border-default-300 bg-white p-2 text-sm text-default-800 placeholder-default-400 focus:outline-none dark:border-default-600 dark:bg-neutral-800 dark:text-default-100"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="rounded-md bg-primary-500 px-3 py-1 text-sm font-medium text-white hover:bg-primary-600"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
