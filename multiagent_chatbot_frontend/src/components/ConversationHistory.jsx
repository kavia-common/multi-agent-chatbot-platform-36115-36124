import React from 'react';

// PUBLIC_INTERFACE
export default function ConversationHistory({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation
}) {
  /** ConversationHistory lists past conversations and allows switching/creating. */
  return (
    <section className="history-panel">
      <div className="history-header">
        <div style={{ fontWeight: 700 }}>Conversation History</div>
        <button className="btn ghost" onClick={onNewConversation}>＋ New</button>
      </div>
      <div className="history-list" role="list">
        {conversations.map(c => (
          <button
            key={c.id}
            className={`history-item ${activeConversationId === c.id ? 'active' : ''}`}
            onClick={() => onSelectConversation(c.id)}
            role="listitem"
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                {new Date(c.updatedAt).toLocaleString()}
              </div>
            </div>
            <span className="badge">{c.agentName}</span>
          </button>
        ))}
        {conversations.length === 0 && (
          <div style={{ color: 'var(--muted)', fontSize: 14, padding: 12 }}>
            No conversations yet. Start by sending a message.
          </div>
        )}
      </div>
    </section>
  );
}
