import { Search, X } from "lucide-react";
import "./SearchBox.css";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
}

function SearchBox({ value, onChange, onSearch, placeholder = '장소명-게시물명을 검색하세요' }: SearchBoxProps) {
    const submit = () => onSearch?.(value.trim());

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    const handleClear = () => {
        onChange('');
        onSearch?.('');
    };


    return (
        <div className= "box">
            <div className= "field">
                <Search className= "searchIcon" />
                <input
                    type="text"
                    className= "input"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {value && (
                    <button
                        className= "clearBtn"
                        aria-label="검색어 지우기"
                        onClick={handleClear}
                    >
                        <X className= "clearIcon" />
                    </button>
                )}
            </div>
            <button className= "submitBtn" onClick={submit}>
                검색
            </button>
        </div>
    );
}

export default SearchBox;
