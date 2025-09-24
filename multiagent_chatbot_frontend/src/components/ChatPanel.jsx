import React, { useState, useRef, useEffect } from 'react';

// PUBLIC_INTERFACE
export default function ChatPanel({ agent, messages, onSend }) {
  /** ChatPanel shows message list and chat input bound to active agent. */
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="chat-panel">
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="agent-avatar">{agent?.name?.slice(0,1)}</div>
          <div>
            <div style={{ fontWeight: 700 }}>{agent?.name || 'Select an agent'}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{agent?.description}</div>
          </div>
        </div>
        <div className="badge">
          Active Agent
        </div>
      </div>
      <div className="messages">
        {messages.map(m => (
          <div key={m.id} className={`message ${m.role}`}>
            <div className="agent-avatar">{m.role === 'user' ? 'U' : (m.agentInitial || 'A')}</div>
            <div className="bubble">
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                {m.role === 'user' ? 'You' : m.agentName}
              </div>
              <div>{m.content}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="chat-input">
        <div className="row">
          <textarea
            className="input"
            placeholder={agent ? `Message ${agent.name}...` : 'Select an agent to start chatting...'}
            value={input}
            rows={2}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={!agent}
            aria-label="Chat input"
          />
          <button className="btn" onClick={handleSend} disabled={!agent || !input.trim()}>
            Send ➤
          </button>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </section>
  );
}
