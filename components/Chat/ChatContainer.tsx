"use client";

import { useState } from "react";
import { useChatStore } from "@/lib/store";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export function ChatContainer() {
  const { currentChatId, addMessage, getCurrentChat } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const currentChat = getCurrentChat();

  const handleSendMessage = async (content: string) => {
    if (!currentChatId) return;

    // Add user message
    addMessage(currentChatId, {
      role: "user",
      content,
    });

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      addMessage(currentChatId, {
        role: "assistant",
        content: generateMockResponse(content),
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <MessageList messages={currentChat?.messages || []} isLoading={isLoading} />
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}

// Mock AI response generator
function generateMockResponse(userMessage: string): string {
  const responses = [
    `"${userMessage}"에 대해 이해했습니다. 이것은 데모 응답입니다.\n\n다음은 몇 가지 예시입니다:\n\n1. **볼드 텍스트** 예시\n2. *이탤릭 텍스트* 예시\n3. \`코드 인라인\` 예시\n\n코드 블록 예시:\n\n\`\`\`javascript\nfunction hello() {\n  console.log("Hello, World!");\n}\n\`\`\`\n\n더 궁금한 점이 있으신가요?`,

    `질문해 주셔서 감사합니다! "${userMessage}"와 관련하여 다음 정보를 제공해 드립니다:\n\n### 주요 포인트\n\n- 첫 번째 포인트\n- 두 번째 포인트\n- 세 번째 포인트\n\n> 이것은 인용구 예시입니다.\n\n추가로 궁금하신 점이 있으면 언제든 물어보세요!`,

    `좋은 질문이네요! "${userMessage}"에 대한 답변입니다.\n\n#### 예제 코드\n\n\`\`\`python\ndef example():\n    print("This is a demo response")\n    return True\n\`\`\`\n\n#### 설명\n\n1. 먼저 함수를 정의합니다\n2. 메시지를 출력합니다\n3. True를 반환합니다\n\n도움이 되셨나요?`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
