import { useRef, useState } from "react";
import "./DropDown.css";
import { sortOptions, type SortType } from "../constants/sortOptions";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface DropDownProps {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
}

function DropDown({ activeSort, onSortChange }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (option: SortType) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
        <div className="post-dropdown-wrapper">
      <div className="post-dropdown-container" ref={ref}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="post-dropdown-trigger"
        >
          {activeSort}
          <span className={`post-dropdown-chevron ${isOpen ? "post-dropdown-chevron-open" : ""}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="post-dropdown-menu">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`post-dropdown-menu-item ${
                  activeSort === option ? "post-dropdown-menu-item-active" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDown;
