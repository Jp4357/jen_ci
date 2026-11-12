import Markdown from "react-markdown";
import type { Message } from "../types";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`row ${isUser ? "row-user" : "row-assistant"}`}>
      {!isUser && <div className="avatar">AI</div>}
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-assistant"}`}>
        {isUser ? message.content : <Markdown>{message.content}</Markdown>}
      </div>
    </div>
  );
}
