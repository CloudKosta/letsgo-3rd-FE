interface ButtonProps {
    text: string;
    type?: "button" | "submit";
    onClick?: () => void;
    disabled?: boolean;
}

function Button({ text, type = "button", onClick, disabled = false }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="w-full h-[50px] mt-2.5 rounded-2xl text-white text-base font-bold shadow-sm transition-all duration-300 bg-[#ff7a00] active:scale-[0.98] active:bg-[#e06b00] disabled:bg-[#e9ecef] disabled:text-[#868e96] disabled:cursor-not-allowed"
        >
            {text}
        </button>
    );
}

export default Button;
