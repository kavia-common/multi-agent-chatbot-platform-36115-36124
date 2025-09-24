import React from 'react';

// PUBLIC_INTERFACE
export default function TopBar({ user, theme, onToggleTheme }) {
  /** TopBar shows brand, user info, and theme toggle. */
  return (
    <header className="topbar">
      <div className="left">
        <div className="logo" aria-hidden="true" />
        <div>
          <div className="brand-title">Multi-Agent Chat</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Ocean Professional</div>
        </div>
        <span className="badge" style={{ marginLeft: 8 }}>
          <span style={{ width: 6, height: 6, background: 'var(--success)', borderRadius: 999 }} />
          Online
        </span>
      </div>
      <div className="right">
        <button className="btn ghost theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(180deg, rgba(245,158,11,0.3), rgba(245,158,11,0.8))',
            color: '#111827', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {user.name.slice(0,1).toUpperCase()}
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 14 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
