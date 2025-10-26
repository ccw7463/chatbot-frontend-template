"use client";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ChatContainer } from "@/components/Chat/ChatContainer";
import { EmptyState } from "@/components/EmptyState";
import { useChatStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Menu, Plus } from "lucide-react";

export default function Home() {
  const { currentChatId, sidebarOpen, toggleSidebar, setCurrentChat } = useChatStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      {/* Collapsed Sidebar Buttons - Only show when sidebar is closed */}
      {!sidebarOpen && (
        <div className="fixed left-0 top-0 z-40 flex h-full w-16 flex-col items-center justify-between border-r border-border bg-background py-4">
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1.5 hover:bg-[#E9E6DC] transition-colors"
              aria-label="사이드바 열기"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
              onClick={() => setCurrentChat(null)}
            >
              <Plus className="h-4 w-4" />
            </div>
          </div>

          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3D3D39] text-white text-xs font-semibold">
            U
          </div>
        </div>
      )}

      <main
        className={cn(
          "flex-1 overflow-hidden transition-all duration-300",
          sidebarOpen ? "ml-[280px]" : "ml-16"
        )}
      >
        {currentChatId ? <ChatContainer /> : <EmptyState />}
      </main>
    </div>
  );
}
