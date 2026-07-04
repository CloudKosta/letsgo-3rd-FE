import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import ChatBotHeader from "./ChatBotHeader";
import MessageBubble from "./components/MessageBubble";
import { useChatBot } from "./hooks/useChatBot";
import "./ChatBot.css";

export default function ChatBot() {
    const { bubbles, sending, error, send, clear } = useChatBot();
    const [text, setText] = useState("");
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [bubbles, sending]);

    const handleSend = () => {
        send(text);
        setText("");
    };

    return (
        <div className="chatbot-container">
            <ChatBotHeader onClear={clear} />
            <div className="chatbot-messages">
                {bubbles.map((b) => (
                    <MessageBubble key={b.key} role={b.role} text={b.text} />
                ))}
                {sending && <MessageBubble role="bot" text="..." />}
                {error && <p className="chatbot-error">{error}</p>}
                <div ref={endRef} />
            </div>

            <div className="chatbot-input-container">
                <div className="chatbot-input-wrapper">
                    <input className="chatbot-input"
                        type="text" placeholder="레저스포츠 관련 질문을 입력해보세요!"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()} />
                    <button className="chatbot-send-button"
                        onClick={handleSend} disabled={sending || !text.trim()}>
                        <Send className="chatbot-send-icon" />
                    </button>
                </div>
            </div>

        </div>
    );
}
