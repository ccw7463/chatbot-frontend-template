"use client";

import { MessageSquare, Lightbulb, Code, Sparkles, ArrowUp, ChevronDown, PenLine, BookOpen, Newspaper } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useChatStore } from "@/lib/store";

type Category = "writing" | "learning" | "conversation" | "news";

const categories = [
  { id: "writing" as Category, name: "작성하기", icon: PenLine },
  { id: "learning" as Category, name: "학습하기", icon: BookOpen },
  { id: "conversation" as Category, name: "일상대화", icon: MessageSquare },
  { id: "news" as Category, name: "뉴스", icon: Newspaper },
];

const examplePrompts: Record<Category, string[]> = {
  writing: [
    "SF 소설의 첫 문단을 작성해줘",
    "비즈니스 이메일 초안을 작성해줘",
    "블로그 포스트 아이디어를 제안해줘",
    "창의적인 광고 문구를 만들어줘",
  ],
  learning: [
    "양자역학의 기본 개념을 설명해줘",
    "머신러닝과 딥러닝의 차이를 알려줘",
    "프랑스어 기초 회화를 가르쳐줘",
    "경제학의 수요와 공급을 설명해줘",
  ],
  conversation: [
    "오늘 날씨에 대해 이야기해줘",
    "주말 계획에 대해 조언해줘",
    "스트레스 해소 방법을 추천해줘",
    "재미있는 농담을 해줘",
  ],
  news: [
    "최근 AI 기술 동향을 요약해줘",
    "오늘의 주요 뉴스를 알려줘",
    "최신 스마트폰 트렌드를 설명해줘",
    "친환경 에너지 발전 현황을 알려줘",
  ],
};

const AI_MODELS = [
  { id: "openai/gpt-4o", name: "openai/gpt-4o" },
  { id: "openai/gpt-4o-mini", name: "openai/gpt-4o-mini" },
  { id: "anthropic/claude-3.5-sonnet", name: "anthropic/claude-3.5-sonnet" },
  { id: "anthropic/claude-3.5-haiku", name: "anthropic/claude-3.5-haiku" },
  { id: "google/gemini-2.0-flash-exp", name: "google/gemini-2.0-flash-exp" },
];

export function EmptyState() {
  const { createChat, addMessage, selectedModel, setSelectedModel } = useChatStore();
  const [input, setInput] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const chatId = createChat({ role: "user", content: content.trim() });
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      addMessage(chatId, {
        role: "assistant",
        content: `"${content.trim()}"에 대한 응답입니다.\n\n이것은 데모 템플릿이므로, 실제 AI 응답을 받으려면 백엔드 API와 연결해야 합니다.\n\n### 다음 단계\n\n1. 백엔드 API 엔드포인트 설정\n2. 채팅 메시지 전송 로직 구현\n3. 스트리밍 응답 처리 (선택사항)\n\n더 궁금한 점이 있으신가요?`,
      });
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
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
    <div className="flex h-full flex-col">
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Welcome Message */}
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center relative">
              {!logoError ? (
                <Image
                  src="/logo.png"
                  alt="Moa Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">안녕하세요, 창우님</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                저는 Moa라고 해요. 오늘은 어떤 도움이 필요하신가요?
              </p>
            </div>
          </div>

          {/* Input Area - Centered */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative rounded-3xl border border-input bg-white focus-within:border-border focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요... (Shift + Enter로 줄바꿈)"
                rows={3}
                className="w-full resize-none bg-transparent px-4 py-3 pr-28 text-sm outline-none placeholder:text-muted-foreground"
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
                  disabled={!input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                  aria-label="전송"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(isActive ? null : category.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background hover:bg-[#F1EFE8]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Example Prompts List */}
          {selectedCategory && (
            <div className="space-y-2">
              {examplePrompts[selectedCategory].map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full rounded-lg border border-border bg-background p-3 text-left text-sm transition-colors hover:bg-[#F1EFE8]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
