import axios from "axios";

/** letsgo-chatbot (FastAPI) 전용 클라이언트. 인증 불필요, 별도 baseURL 사용. */
const chatbotApi = axios.create({
  baseURL: import.meta.env.VITE_CHATBOT_API_BASE_URL,
});

/** 서버 ChatResponse 스키마 (한 번의 대화 = 질문+답변). */
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

/** 세션 식별자를 탭 단위(sessionStorage)로 저장(UUID, 최대 36자). */
const SESSION_KEY = "chatbot_session_id";

export function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** 현재 세션을 버리고 새 세션 발급(서버 기록은 그대로 보존). */
export function resetSessionId(): string {
  const id = crypto.randomUUID();
  sessionStorage.setItem(SESSION_KEY, id);
  return id;
}

/** 메시지 전송 → 봇 응답 로그 반환. */
export async function sendChat(sessionId: string, message: string): Promise<ChatLog> {
  const res = await chatbotApi.post<ChatLog>("/chat", { session_id: sessionId, message });
  return res.data;
}

/** 세션의 대화 이력 조회. */
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
