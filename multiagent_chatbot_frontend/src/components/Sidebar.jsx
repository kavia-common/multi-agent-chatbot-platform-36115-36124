import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ agents, activeAgentId, onSelectAgent, onAddAgent }) {
  /** Sidebar shows agent list, quick add, and search. */
  const [query, setQuery] = useState('');
  const filtered = agents.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="sidebar">
      <div className="search">
        <input
          className="input"
          placeholder="Search agents..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search agents"
        />
        <button className="btn" onClick={onAddAgent} aria-label="Add agent">＋ Add</button>
      </div>
      <div className="separator" />
      <div className="agents" role="list">
        {filtered.map(agent => (
          <button
            key={agent.id}
            className={`agent-item ${activeAgentId === agent.id ? 'active' : ''}`}
            onClick={() => onSelectAgent(agent.id)}
            role="listitem"
          >
            <div className="agent-avatar">{agent.name.slice(0,1)}</div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{agent.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{agent.description}</div>
            </div>
            <div className="badge">{agent.capability}</div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ color: 'var(--muted)', fontSize: 14, padding: 12 }}>
            No agents match “{query}”.
          </div>
        )}
      </div>
    </aside>
  );
}
