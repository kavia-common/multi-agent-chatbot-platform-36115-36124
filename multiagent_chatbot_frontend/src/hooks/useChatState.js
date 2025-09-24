import { useEffect, useMemo, useState } from 'react';
import { ChatService } from '../services/api';

/**
 * useChatState centralizes UI state, active agent and conversation, and provides actions.
 */
export function useChatState() {
  const [theme, setTheme] = useState('light');
  const [agents, setAgents] = useState([]);
  const [activeAgentId, setActiveAgentId] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const [messages, setMessages] = useState([]);
  const [user] = useState({ name: 'Alex Morgan', role: 'Pro User' });

  // Initialize mock data
  useEffect(() => {
    const initialAgents = [
      { id: 'a1', name: 'Researcher', description: 'Finds and cites information', capability: 'R&D' },
      { id: 'a2', name: 'Coder', description: 'Writes and explains code', capability: 'Code' },
      { id: 'a3', name: 'Analyst', description: 'Analyzes user data and trends', capability: 'Data' }
    ];
    setAgents(initialAgents);
    setActiveAgentId('a1');

    const now = Date.now();
    const initialConvs = [
      { id: 'c1', title: 'Welcome conversation', agentId: 'a1', agentName: 'Researcher', updatedAt: now - 3600000 },
    ];
    setConversations(initialConvs);
    setActiveConversationId('c1');

    setMessages([
      { id: 'm1', role: 'assistant', agentName: 'Researcher', agentInitial: 'R', content: 'Hello! I am your Researcher agent. How can I assist you today?' }
    ]);
  }, []);

  // Apply theme to body root
  useEffect(() => {
    const root = document.querySelector('.app-root');
    if (!root) return;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const service = useMemo(() => new ChatService(), []);

  const appendMessage = (msg) => setMessages(prev => [...prev, msg]);

  // PUBLIC_INTERFACE
  const sendMessage = async (text) => {
    if (!activeAgentId) return;
    const agent = agents.find(a => a.id === activeAgentId);
    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text
    };
    appendMessage(userMsg);

    // Update conversation timestamp
    setConversations(prev => prev.map(c => c.id === activeConversationId ? { ...c, updatedAt: Date.now() } : c));

    // Mock API call to get assistant response
    const response = await service.sendMessage({
      conversationId: activeConversationId,
      agentId: activeAgentId,
      message: text
    });

    const assistantMsg = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      agentName: agent?.name || 'Agent',
      agentInitial: agent?.name?.slice(0,1) || 'A',
      content: response.text
    };
    appendMessage(assistantMsg);
  };

  // PUBLIC_INTERFACE
  const createNewConversation = () => {
    if (!activeAgentId) return;
    const agent = agents.find(a => a.id === activeAgentId);
    const id = `c_${Date.now()}`;
    const newConv = {
      id,
      title: `Chat with ${agent?.name}`,
      agentId: activeAgentId,
      agentName: agent?.name || 'Agent',
      updatedAt: Date.now()
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(id);
    setMessages([]);
  };

  // PUBLIC_INTERFACE
  const addAgent = () => {
    const idx = agents.length + 1;
    const id = `a_${Date.now()}`;
    const newAgent = {
      id,
      name: `Agent ${idx}`,
      description: 'Custom helper agent',
      capability: 'Custom'
    };
    setAgents(prev => [...prev, newAgent]);
    setActiveAgentId(id);
  };

  return {
    theme, setTheme,
    agents, activeAgentId, setActiveAgentId,
    conversations, activeConversationId, setActiveConversationId,
    messages, sendMessage,
    user, createNewConversation, addAgent
  };
}
