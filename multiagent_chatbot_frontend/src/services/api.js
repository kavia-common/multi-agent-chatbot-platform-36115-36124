const sleep = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * ChatService provides an abstraction over chat-related API calls.
 * Currently backed by a mock in-memory implementation; replace with real endpoints when available.
 */
export class ChatService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || process.env.REACT_APP_API_URL || '';
  }

  // PUBLIC_INTERFACE
  async sendMessage({ conversationId, agentId, message }) {
    /** Sends a user message and receives an assistant response (mock). */
    // Example of where you'd do a real fetch:
    // const res = await fetch(`${this.baseUrl}/chat/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ conversationId, agentId, message }) });
    // return await res.json();

    await sleep(600 + Math.random() * 800);
    const canned = [
      "I've analyzed your request and here are my findings.",
      "Certainly! Here's a structured response with key points:",
      "Good question. To approach this, consider the following steps.",
      "I can help with that. First, let's outline the problem.",
      "Based on your query, here's a concise explanation:"
    ];
    const pick = canned[Math.floor(Math.random() * canned.length)];
    return { text: `${pick}\n\n— Mock response from agent ${agentId} in conversation ${conversationId}.` };
  }
}
