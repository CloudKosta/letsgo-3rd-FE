import { Search, X } from 'lucide-react';
import styles from './css/SearchBox.module.css';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
}

function SearchBox({ value, onChange, onSearch, placeholder = '장소를 검색하세요' }: SearchBoxProps) {
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
        <div className={styles.box}>
            <div className={styles.field}>
                <Search className={styles.searchIcon} />
                <input
                    type="text"
                    className={styles.input}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {value && (
                    <button
                        className={styles.clearBtn}
                        aria-label="검색어 지우기"
                        onClick={handleClear}
                    >
                        <X className={styles.clearIcon} />
                    </button>
                )}
            </div>
            <button className={styles.submitBtn} onClick={submit}>
                검색
            </button>
        </div>
    );
}

export default SearchBox;
