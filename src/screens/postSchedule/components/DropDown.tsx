import { useState } from "react";

const SORT_OPTIONS = ['최신순', '좋아요순', '조회순', '제목순'];

type SortType = (typeof SORT_OPTIONS)[number];

export default function DropDown(){
    const [isOpen, setIsOpen] = useState(false);
    const [sortType, setSortType] = useState<SortType>('최신순');

    const handleSelect = (option: SortType) => {
    setSortType(option);
    setIsOpen(!isOpen);
  };
  

    return(
        <div>
            <button onClick={() => setIsOpen((prev) => !prev)} className= "flex items-center justify-between w-26 px-4 py-2 bg-white rounded-2xl shadow text-sm font-bold text-gray-700  transition-all hover:bg-gray-50"> {sortType}
                <span>
                    {isOpen ? '▲' : '▼'}
                </span>
            </button>

      {isOpen && (
        <ul>
          {SORT_OPTIONS.map((option) => (
            <li key={option}>
              <button onClick={() => handleSelect(option)} className= "flex items-center justify-between w-22 px-4 py-2 bg-white rounded-2xl shadow text-sm font-bold text-gray-700  transition-all hover:bg-gray-50"> {option} </button>
            </li>))}
        </ul>)}
    </div>
    );
}