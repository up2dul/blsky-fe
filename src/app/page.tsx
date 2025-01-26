"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Message } from "@/lib/types";
import { timestampToText } from "@/lib/utils";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("messagesHistory", (messages: Message[]) => {
      setIsLoadingMessages(false);
      setMessages(messages);
    });
    return () => {
      socket.off("messagesHistory", () => {});
    };
  }, []);

  const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  const resetMessagesHandler = () => {
    socket.emit("messagesReset");
  };

  return (
    <main className="relative w-full min-h-screen mx-auto bg-slate-950 sm:w-3/4 lg:w-1/2">
      <ul className="h-svh relative overflow-y-auto p-3 pb-[70px] space-y-3">
        {isLoadingMessages && (
          <li className="mt-6 text-center text-slate-400">
            Loading messages...
          </li>
        )}
        {!isLoadingMessages && messages.length === 0 && (
          <li className="mt-6 text-center text-slate-400">
            No messages yet. Send a message to start.
          </li>
        )}
        {messages.map(msg => (
          <li
            key={msg.id}
            className="rounded-sm bg-slate-800 p-2 text-slate-50"
          >
            {msg.content} <br />
            <span className="text-xs text-slate-500">
              {timestampToText(msg.timestamp)}
            </span>
          </li>
        ))}
      </ul>

      <form
        onSubmit={sendMessageHandler}
        className="flex gap-2 p-2 pb-3 absolute bottom-0 w-full bg-slate-800 rounded-t-sm border-t-4 border-slate-950"
      >
        <Input
          value={message}
          placeholder={
            isLoadingMessages ? "Loading..." : "Type a message here..."
          }
          onChange={e => setMessage(e.target.value)}
          disabled={isLoadingMessages}
        />
        <Button type="submit" disabled={message.length < 1}>
          Send
        </Button>
      </form>

      {messages.length > 0 && (
        <Button
          className="fixed bottom-20 right-4 md:right-12 lg:right-24"
          variant="destructive"
          onClick={resetMessagesHandler}
        >
          Reset chat
        </Button>
      )}
    </main>
  );
}
