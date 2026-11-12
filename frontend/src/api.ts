import type { Message } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

interface ChatResponse {
  response: string;
}

export async function sendChat(messages: Message[]): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data: ChatResponse = await res.json();
  return data.response;
}
