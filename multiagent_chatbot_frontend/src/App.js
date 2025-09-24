import React from 'react';
import './styles/theme.css';
import './styles/layout.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import ConversationHistory from './components/ConversationHistory';
import { useChatState } from './hooks/useChatState';

/**
 * Root App renders the full multi-agent chatbot layout:
 * - TopBar (user info / status)
 * - Sidebar (agent list and add agent control)
 * - ChatPanel (messages + input)
 * - ConversationHistory (list of prior conversations)
 */
function App() {
  const {
    theme,
    setTheme,
    agents,
    activeAgentId,
    setActiveAgentId,
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    sendMessage,
    user,
    createNewConversation,
    addAgent
  } = useChatState();

  return (
    <div className={`app-root ${theme}`}>
      <TopBar
        user={user}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <div className="app-body">
        <Sidebar
          agents={agents}
          activeAgentId={activeAgentId}
          onSelectAgent={setActiveAgentId}
          onAddAgent={addAgent}
        />
        <main className="app-main">
          <ChatPanel
            agent={agents.find(a => a.id === activeAgentId)}
            messages={messages}
            onSend={sendMessage}
          />
          <ConversationHistory
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={setActiveConversationId}
            onNewConversation={createNewConversation}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
