"use client";

import { Plus } from "lucide-react";
import { useChatStore } from "@/lib/store";

export function NewChatButton() {
  const { setCurrentChat } = useChatStore();

  const handleNewChat = () => {
    setCurrentChat(null);
  };

  return (
    <button
      onClick={handleNewChat}
      className="flex w-full items-center justify-start gap-3 pl-1 text-sm font-medium transition-colors hover:text-accent-foreground"
    >
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
        <Plus className="h-4 w-4" />
      </div>
      새 채팅
    </button>
  );
}
