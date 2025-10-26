# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern AI chatbot frontend template built with Next.js, TypeScript, and Tailwind CSS. It provides a production-ready interface similar to ChatGPT and Claude, with features like chat history, dark/light mode, markdown rendering, and responsive design.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand with persist middleware
- **UI Components**: Custom components with Lucide React icons
- **Markdown**: react-markdown with remark-gfm and react-syntax-highlighter

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

Development server runs on http://localhost:3000

## Architecture

### Component Structure

```
app/
├── layout.tsx          # Root layout with ThemeProvider
├── page.tsx           # Main page with Sidebar and ChatContainer/EmptyState
└── globals.css        # Global styles and theme variables

components/
├── Sidebar/
│   ├── Sidebar.tsx           # Main sidebar with responsive behavior
│   ├── NewChatButton.tsx     # Button to create new chats
│   ├── ChatHistory.tsx       # Grouped chat history list
│   └── ChatHistoryItem.tsx   # Individual chat item with edit/delete
├── Chat/
│   ├── ChatContainer.tsx     # Main chat container with message handling
│   ├── ChatHeader.tsx        # Header with sidebar toggle
│   ├── MessageList.tsx       # Scrollable message list
│   ├── Message.tsx           # Individual message with markdown
│   └── ChatInput.tsx         # Auto-resizing textarea input
├── EmptyState.tsx      # Welcome screen with example prompts
├── ThemeProvider.tsx   # Theme context provider
└── ThemeToggle.tsx     # Dark/light mode toggle button

lib/
├── store.ts           # Zustand store for chat state
└── utils.ts          # Utility functions (cn for className merging)
```

### State Management

Using Zustand with localStorage persistence:
- `chats`: Array of all chat conversations
- `currentChatId`: Active chat ID
- `sidebarOpen`: Sidebar visibility state
- Actions: createChat, deleteChat, updateChatTitle, addMessage, etc.

### Styling System

- Tailwind CSS with custom theme configuration
- CSS variables for colors (supports dark/light mode)
- Custom scrollbar styles
- Responsive breakpoints: mobile (<768px), tablet (768-1023px), desktop (≥1024px)

## Key Features

1. **Chat Management**
   - Create new chats
   - Edit chat titles
   - Delete chats with confirmation
   - Automatic title generation from first message
   - Chat history grouped by date (Today, Yesterday, Last 7 days, etc.)

2. **Message Display**
   - User messages (right-aligned, primary color)
   - AI messages (left-aligned, with markdown support)
   - Code highlighting with syntax-highlighter
   - Copy message button
   - Auto-scroll to bottom on new messages

3. **Responsive Design**
   - Desktop: Persistent sidebar (280px width)
   - Mobile/Tablet: Overlay sidebar with backdrop
   - Touch-friendly button sizes
   - Auto-resizing textarea (max 200px height)

4. **Theme System**
   - Light/Dark/System modes
   - Persisted to localStorage
   - Smooth transitions
   - CSS variable-based theming

## Backend Integration

Currently uses mock responses. To integrate with a real backend:

1. Modify `components/Chat/ChatContainer.tsx`
2. Replace `generateMockResponse()` with actual API calls
3. Example integration in README.md

Common integration patterns:
- REST API: `fetch('/api/chat', { method: 'POST', ... })`
- WebSocket: For streaming responses
- Server-Sent Events: For real-time updates

## Important Files

- `lib/store.ts` - All state management logic
- `app/globals.css` - Theme variables and custom styles
- `tailwind.config.ts` - Tailwind customization
- `components/Chat/ChatContainer.tsx` - Main chat logic (API integration point)
- `components/Chat/Message.tsx` - Markdown rendering configuration

## Development Notes

1. **Adding new features**: Consider state requirements and update Zustand store
2. **Styling changes**: Use Tailwind utilities; modify CSS variables for theme changes
3. **API integration**: Focus on ChatContainer.tsx, maintain existing state flow
4. **Testing**: Ensure localStorage persistence works, test responsive behavior
5. **Performance**: Message list auto-scrolls, virtualization not implemented yet

## Common Customizations

- **Colors**: Edit `app/globals.css` CSS variables
- **Example prompts**: Edit `components/EmptyState.tsx`
- **Sidebar width**: Change `w-[280px]` in `components/Sidebar/Sidebar.tsx`
- **Message max width**: Change `max-w-3xl` in message components
- **Date grouping**: Modify `groupChatsByDate()` in `components/Sidebar/ChatHistory.tsx`