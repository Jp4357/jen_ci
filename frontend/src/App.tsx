import { useEffect, useRef, useState } from "react";
import { sendChat } from "./api";
import ChatInput from "./components/ChatInput";
import MessageBubble from "./components/MessageBubble";
import type { Message } from "./types";

const STORAGE_KEY = "chat-history";
const SUGGESTIONS = [
  "Explain CI/CD in simple terms",
  "What does a Jenkinsfile do?",
  "Give me a FastAPI tip",
];

function loadHistory(): Message[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? (JSON.parse(saved) as Message[]) : [];
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text: string) {
    const history: Message[] = [...messages, { role: "user", content: text }];
    setMessages(history);
    setLoading(true);
    setError("");
    try {
      const reply = await sendChat(history);
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function newChat() {
    setMessages([]);
    setError("");
  }

  return (
    <div className="app">
      <header>
        <div className="brand">
          <span className="dot" />
          LLM Chat
        </div>
        <button className="ghost" onClick={newChat} disabled={!messages.length || loading}>
          New chat
        </button>
      </header>

      <main className="messages">
        {messages.length === 0 && (
          <div className="empty">
            <h1>How can I help today?</h1>
            <div className="suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {loading && (
          <div className="row row-assistant">
            <div className="avatar">AI</div>
            <div className="bubble bubble-assistant typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
        <div ref={bottomRef} />
      </main>

      <footer>
        <ChatInput onSend={handleSend} disabled={loading} />
      </footer>
    </div>
  );
}
