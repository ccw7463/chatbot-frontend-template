import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

type ChatStore = {
  chats: Chat[];
  currentChatId: string | null;
  sidebarOpen: boolean;
  selectedModel: string;

  // Chat actions
  createChat: (message?: Message) => string;
  deleteChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  setCurrentChat: (chatId: string | null) => void;

  // Message actions
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: (chatId: string) => void;

  // UI actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSelectedModel: (model: string) => void;

  // Helper getters
  getCurrentChat: () => Chat | null;
};

const generateId = () => Math.random().toString(36).substring(2, 11);

const generateChatTitle = (message?: Message): string => {
  if (message && message.content) {
    return message.content.slice(0, 30) + (message.content.length > 30 ? "..." : "");
  }
  return "새 채팅";
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      sidebarOpen: true,
      selectedModel: "openai/gpt-4o",

      createChat: (message) => {
        const newChatId = generateId();
        const now = new Date();
        const messages = message
          ? [{ ...message, id: generateId(), timestamp: now }]
          : [];

        const newChat: Chat = {
          id: newChatId,
          title: generateChatTitle(message),
          messages,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChatId,
        }));

        return newChatId;
      },

      deleteChat: (chatId) => {
        set((state) => {
          const newChats = state.chats.filter((chat) => chat.id !== chatId);
          const newCurrentChatId =
            state.currentChatId === chatId
              ? newChats.length > 0
                ? newChats[0].id
                : null
              : state.currentChatId;

          return {
            chats: newChats,
            currentChatId: newCurrentChatId,
          };
        });
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, title, updatedAt: new Date() } : chat
          ),
        }));
      },

      setCurrentChat: (chatId) => {
        set({ currentChatId: chatId });
      },

      addMessage: (chatId, message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          timestamp: new Date(),
        };

        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              const updatedChat = {
                ...chat,
                messages: [...chat.messages, newMessage],
                updatedAt: new Date(),
              };

              // Update title if this is the first user message
              if (
                message.role === "user" &&
                chat.messages.filter((m) => m.role === "user").length === 0
              ) {
                updatedChat.title = generateChatTitle(newMessage);
              }

              return updatedChat;
            }
            return chat;
          }),
        }));
      },

      clearMessages: (chatId) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [], updatedAt: new Date() }
              : chat
          ),
        }));
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      setSelectedModel: (model) => {
        set({ selectedModel: model });
      },

      getCurrentChat: () => {
        const state = get();
        return state.chats.find((chat) => chat.id === state.currentChatId) || null;
      },
    }),
    {
      name: "chatbot-storage",
    }
  )
);
