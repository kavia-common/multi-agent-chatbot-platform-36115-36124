# Multi-Agent Chatbot Frontend (React)

A modern, minimalist React UI for interacting with a multi-agent chatbot system.

## Ocean Professional Theme
- Primary: `#2563EB`
- Secondary/Success: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

## Layout
- Top bar: user info + theme toggle
- Sidebar: agent list with search and add agent
- Main: chat panel (messages + input)
- Bottom: conversation history panel

## Development
- `npm start` — start dev server
- `npm test` — run tests
- `npm run build` — build for production

## Environment Variables
- REACT_APP_API_URL — Base URL of the backend API (optional; not required for mock mode)

## Code Structure
- src/components — TopBar, Sidebar, ChatPanel, ConversationHistory
- src/hooks — useChatState manages agents, conversations, messages, and theme
- src/services/api.js — ChatService abstraction (mocked; replace with real API)
- src/styles — theme.css and layout.css

## Extensibility
- Add more agents: via Sidebar "Add" or by seeding in useChatState.
- Replace mock API: implement ChatService methods to call your backend.

