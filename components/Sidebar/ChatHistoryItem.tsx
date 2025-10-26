"use client";

import { Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Chat, useChatStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type ChatHistoryItemProps = {
  chat: Chat;
};

export function ChatHistoryItem({ chat }: ChatHistoryItemProps) {
  const { currentChatId, setCurrentChat, deleteChat, updateChatTitle } = useChatStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(chat.title);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = currentChatId === chat.id;

  const handleClick = () => {
    if (!isEditing) {
      setCurrentChat(chat.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("이 채팅을 삭제하시겠습니까?")) {
      deleteChat(chat.id);
    }
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      updateChatTitle(chat.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setEditedTitle(chat.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
        isActive
          ? "bg-[#E9E6DC] text-accent-foreground"
          : "hover:bg-[#E9E6DC] text-muted-foreground hover:text-foreground"
      )}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSaveTitle}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-b border-border outline-none"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="flex-1 truncate">{chat.title}</span>
      )}

      {isHovered && !isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="p-1 rounded hover:bg-background/50"
            aria-label="편집"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-background/50 hover:text-red-500"
            aria-label="삭제"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
