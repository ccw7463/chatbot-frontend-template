"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Message } from "./Message";
import type { Message as MessageType } from "@/lib/store";

type MessageListProps = {
  messages: MessageType[];
  isLoading?: boolean;
};

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="mx-auto max-w-3xl">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex gap-4 px-4 py-6 bg-muted/30">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse" />
                <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse [animation-delay:0.2s]" />
                <div className="h-4 w-4 rounded-full bg-muted-foreground/20 animate-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
