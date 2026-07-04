import { RotateCcw } from "lucide-react";
import "./ChatBotHeader.css";

interface ChatBotHeaderProps {
    onClear?: () => void;
}

function ChatBotHeader({ onClear }: ChatBotHeaderProps) {
    return (
        <header className="chatbot-header">
            <a href="/" className="chatbot-header-logo">
                챗봇
            </a>
            {onClear && (
                <button className="chatbot-header-clear" onClick={onClear} title="새 대화">
                    <RotateCcw className="w-5 h-5" />
                </button>
            )}
        </header>
    );
}

export default ChatBotHeader;
