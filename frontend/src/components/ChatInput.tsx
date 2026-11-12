import { useState } from "react";
import type { KeyboardEvent } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="input-bar">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message the assistant..."
        rows={1}
      />
      <button onClick={submit} disabled={disabled || !text.trim()} aria-label="Send">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M3.4 20.4 21 12 3.4 3.6v6.4l12.6 2-12.6 2z" />
        </svg>
      </button>
    </div>
  );
}
