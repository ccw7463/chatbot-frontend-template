"use client";

import { ArrowUp, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/lib/store";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

const AI_MODELS = [
  { id: "openai/gpt-4o", name: "openai/gpt-4o" },
  { id: "openai/gpt-4o-mini", name: "openai/gpt-4o-mini" },
  { id: "anthropic/claude-3.5-sonnet", name: "anthropic/claude-3.5-sonnet" },
  { id: "anthropic/claude-3.5-haiku", name: "anthropic/claude-3.5-haiku" },
  { id: "google/gemini-2.0-flash-exp", name: "google/gemini-2.0-flash-exp" },
];

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedModel, setSelectedModel } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-background px-4 py-4">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="relative rounded-3xl border border-input bg-white focus-within:border-border focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요... (Shift + Enter로 줄바꿈)"
            disabled={disabled}
            rows={3}
            className="w-full resize-none bg-transparent px-4 py-3 pr-28 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            style={{ maxHeight: "200px", minHeight: "80px" }}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {/* Model Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors"
                aria-label="모델 선택"
              >
                <span className="max-w-[100px] truncate">{selectedModel}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {showModelDropdown && (
                <div className="absolute bottom-full right-0 mb-2 w-56 rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(model.id);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                        selectedModel === model.id
                          ? "bg-[#E9E6DC] text-accent-foreground font-medium"
                          : "hover:bg-[#F1EFE8]"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
              aria-label="전송"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
