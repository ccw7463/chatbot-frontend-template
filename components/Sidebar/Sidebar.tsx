"use client";

import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useChatStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { NewChatButton } from "./NewChatButton";
import { ChatHistory } from "./ChatHistory";
import { useState } from "react";

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useChatStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col gap-4 border-r border-border bg-[#F6F4EE] p-4 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="rounded-md p-1.5 hover:bg-[#E9E6DC] transition-colors"
            aria-label="사이드바 토글"
          >
            {isHovered ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <h2 className="text-lg font-normal">Chatbot Moa</h2>
        </div>

        {/* New Chat Button */}
        <NewChatButton />

        {/* Chat History */}
        <ChatHistory />

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-border pt-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3D3D39] text-white text-xs font-semibold">
            U
          </div>
          <span className="text-sm font-medium">사용자</span>
        </div>
      </aside>
    </>
  );
}
