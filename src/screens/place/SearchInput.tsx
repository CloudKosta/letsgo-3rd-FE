import { Search } from "lucide-react";
import "./SearchInput.css";

export default function SearchInput() {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                    className="search-input"
                    placeholder="여행지를 검색하세요"
                />
            </div>
        </div>
    );
}