"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import type { Message } from "@/lib/types";
import { generateTimestamp } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), message, timestamp: generateTimestamp() },
      ]);
    });
    return () => {
      socket.off("message", () => {});
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <main className="relative w-full min-h-screen mx-auto bg-slate-950 sm:w-3/4 lg:w-1/2">
      <ul className="h-svh relative overflow-y-auto p-3 pb-[70px] space-y-3">
        {messages.length === 0 && (
          <li className="mt-6 text-center text-sm text-slate-500">
            No messages yet. Send a message to start.
          </li>
        )}
        {messages.map(msg => (
          <li
            key={msg.id}
            className="rounded-sm bg-slate-800 p-2 text-slate-50"
          >
            {msg.message} <br />
            <span className="text-xs text-slate-500">{msg.timestamp}</span>
          </li>
        ))}
      </ul>
      <form
        onSubmit={sendMessage}
        className="flex gap-2 p-2 absolute bottom-0 w-full bg-slate-800 rounded-t-sm"
      >
        <Input
          value={message}
          placeholder="Type a message here..."
          onChange={e => setMessage(e.target.value)}
        />
        <Button type="submit" disabled={message.length < 1}>
          Send
        </Button>
      </form>
    </main>
  );
}
