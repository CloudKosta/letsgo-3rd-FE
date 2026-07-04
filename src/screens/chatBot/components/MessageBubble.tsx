import type { Bubble } from "../hooks/useChatBot";
import "./MessageBubble.css";

export default function MessageBubble({ role, text }: Pick<Bubble, "role" | "text">) {
  return (
    <div className={`bubble-row bubble-row-${role}`}>
      <div className={`bubble bubble-${role}`}>{text}</div>
    </div>
  );
}
