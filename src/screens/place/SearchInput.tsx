import { Search } from "lucide-react";
import type { SearchInputProps } from "./interface";
import "./SearchInput.css";

export default function SearchInput({ keyword, setKeyword }: SearchInputProps) {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                    className="search-input"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
        </div>
    );
}
