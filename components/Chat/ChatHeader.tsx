"use client";

import { useChatStore } from "@/lib/store";
import { useState, useRef, useEffect } from "react";

export function ChatHeader() {
  const { getCurrentChat, updateChatTitle } = useChatStore();
  const currentChat = getCurrentChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    if (currentChat) {
      setEditedTitle(currentChat.title);
      setIsEditing(true);
    }
  };

  const handleSaveTitle = () => {
    if (currentChat && editedTitle.trim()) {
      updateChatTitle(currentChat.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSaveTitle}
          onKeyDown={handleKeyDown}
          className="bg-white text-base font-normal outline-none border-2 border-blue-500 rounded-md px-2 py-1"
        />
      ) : (
        <h1
          onClick={handleTitleClick}
          className="text-base font-normal cursor-pointer hover:bg-[#E9E6DC] transition-colors rounded-md px-2 py-1"
        >
          {currentChat?.title || "새 채팅"}
        </h1>
      )}
    </header>
  );
}
