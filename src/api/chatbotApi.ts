import axios from "axios";

const chatbotApi = axios.create({
  baseURL: import.meta.env.VITE_CHATBOT_API_BASE_URL,
});

export interface ChatLog {
  id: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  model: string;
  created_at: string;
}

export interface ChatLogList {
  total: number;
  logs: ChatLog[];
}

const SESSION_KEY = "chatbot_session_id";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generateUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function resetSessionId(): string {
  const id = generateUUID();
  sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

export async function sendChat(sessionId: string, message: string): Promise<ChatLog> {
  const res = await chatbotApi.post<ChatLog>("/chat", { session_id: sessionId, message });
  return res.data;
}

export async function getChatLogs(
  sessionId: string,
  skip = 0,
  limit = 20
): Promise<ChatLogList> {
  const res = await chatbotApi.get<ChatLogList>("/chat", {
    params: { session_id: sessionId, skip, limit },
  });
  return res.data;
}
