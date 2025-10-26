"use client";

import { useChatStore } from "@/lib/store";
import { ChatHistoryItem } from "./ChatHistoryItem";

type ChatGroup = {
  label: string;
  chats: ReturnType<typeof useChatStore>["chats"];
};

function groupChatsByDate(chats: ReturnType<typeof useChatStore>["chats"]): ChatGroup[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastMonth = new Date(today);
  lastMonth.setDate(lastMonth.getDate() - 30);

  const groups: ChatGroup[] = [
    { label: "오늘", chats: [] },
    { label: "어제", chats: [] },
    { label: "지난 7일", chats: [] },
    { label: "지난 30일", chats: [] },
    { label: "이전", chats: [] },
  ];

  chats.forEach((chat) => {
    const chatDate = new Date(chat.updatedAt);
    const chatDay = new Date(
      chatDate.getFullYear(),
      chatDate.getMonth(),
      chatDate.getDate()
    );

    if (chatDay.getTime() === today.getTime()) {
      groups[0].chats.push(chat);
    } else if (chatDay.getTime() === yesterday.getTime()) {
      groups[1].chats.push(chat);
    } else if (chatDate >= lastWeek) {
      groups[2].chats.push(chat);
    } else if (chatDate >= lastMonth) {
      groups[3].chats.push(chat);
    } else {
      groups[4].chats.push(chat);
    }
  });

  return groups.filter((group) => group.chats.length > 0);
}

export function ChatHistory() {
  const { chats } = useChatStore();

  if (chats.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
        채팅 기록이 없습니다
      </div>
    );
  }

  const groupedChats = groupChatsByDate(chats);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {groupedChats.map((group) => (
        <div key={group.label} className="mb-4">
          <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
            {group.label}
          </h3>
          <div className="space-y-1">
            {group.chats.map((chat) => (
              <ChatHistoryItem key={chat.id} chat={chat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
