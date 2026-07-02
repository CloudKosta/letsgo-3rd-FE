import { Send } from "lucide-react";
import ChatBotHeader from "./ChatBotHeader";
import "./ChatBot.css";

export default function ChatBot() {
    return (
        <div className="chatbot-container">
            <ChatBotHeader />
            <div className="chatbot-messages">

            </div>

            <div className="chatbot-input-container">
                <div className="chatbot-input-wrapper">
                    <input className="chatbot-input"
                        type="text" placeholder="메시지를 입력해주세요" />
                    <button className="chatbot-send-button">
                        <Send className="chatbot-send-icon" />
                    </button>
                </div>
            </div>

        </div>
    );
}

