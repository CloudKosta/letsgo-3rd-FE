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
        <div className="post-search-box">
            <div className="post-search-field">
                <Search className="post-search-icon" />
                <input
                    type="text"
                    className="post-search-input"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {value && (
                    <button
                        className="post-search-clear-btn"
                        aria-label="검색어 지우기"
                        onClick={handleClear}
                    >
                        <X className="post-search-clear-icon" />
                    </button>
                )}
            </div>
            <button className="post-search-submit-btn" onClick={submit}>
                검색
            </button>
        </div>
    );
}

export default SearchBox;
