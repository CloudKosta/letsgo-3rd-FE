interface InputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}

function Input({ label, id, name, value, onChange, type = "text", placeholder }: InputProps) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-[13px] font-bold text-[#534537] mb-1.5">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full h-[50px] bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl px-4 text-[15px] outline-none transition-all duration-300 focus:border-[#ff7a00] focus:bg-white focus:ring-[3px] focus:ring-[#ff7a00]/10"
            />
        </div>
    );
}

export default Input;
