import { Compass, Hotel, Utensils } from "lucide-react";
import type { TabType, LookupTableProps } from "./interface";
import { useDragScroll } from "../../hooks/useDragScroll";
import "./LookupTable.css";

const CATEGORY_MAP = {
    LEISURE: {
        "육상레저스포츠": ["자전거 (둘레길)", "스케이트", "사격장", "산책/둘레길"],
        "수상레저스포츠": ["윈드서핑/수상스키", "요트", "수영", "카약/카누"],
        "항공레저스포츠": ["헹글라이딩/패러글라이딩"]
    },
    STAY: {
        "호텔": ["호텔"],
        "콘도/레지던스": ["콘도", "레지던스"],
        "펜션/민박": ["펜션", "한옥스테이", "민박"],
        "모텔": ["모텔"],
        "캠핑": ["일반야영장", "오토캠핑장", "글램핑장"]
    },
    RESTAURANT: {
        "한식": ["한식"],
        "기타식문화": ["중식", "일식", "양식", "디저트/카페"]
    }
} as const;

export default function LookupTable({
    currentTab,
    setCurrentTab,
    selectedMajor,
    setSelectedMajor,
    selectedSub,
    setSelectedSub
}: LookupTableProps) {
    const majorDrag = useDragScroll();
    const subDrag = useDragScroll();

    const handleTabChange = (tab: TabType) => {
        setCurrentTab(tab);
        setSelectedMajor('');
        setSelectedSub('');
    }

    const handleMajorSelect = (major: string) => {
        setSelectedMajor(major);
        setSelectedSub('');
    }

    const handleSubSelect = (sub: string) => {
        setSelectedSub(sub);
    }

    const majorCategories = Object.keys(CATEGORY_MAP[currentTab]);
    const subCategories = selectedMajor
        ? (CATEGORY_MAP[currentTab] as Record<string, readonly string[]>)[selectedMajor]
        : [];

    return (
        <div className="lookup-container">
            <div className="lookup-tabs">
                <button
                    className={`lookup-tab ${currentTab === 'LEISURE' ? 'active' : ''}`}
                    onClick={() => handleTabChange('LEISURE')}
                >
                    <Compass className="lookup-tab-icon" />
                    레저스포츠
                </button>
                <button
                    className={`lookup-tab ${currentTab === 'STAY' ? 'active' : ''}`}
                    onClick={() => handleTabChange('STAY')}
                >
                    <Hotel className="lookup-tab-icon" />
                    숙소
                </button>
                <button
                    className={`lookup-tab ${currentTab === 'RESTAURANT' ? 'active' : ''}`}
                    onClick={() => handleTabChange('RESTAURANT')}
                >
                    <Utensils className="lookup-tab-icon" />
                    음식점
                </button>
            </div>

            <div className="lookup-section">
                <div
                    className="lookup-button-group"
                    ref={majorDrag.ref}
                    onMouseDown={majorDrag.onMouseDown}
                    style={majorDrag.style}
                >
                    <button
                        className={`lookup-btn ${selectedMajor === '' ? 'active' : ''}`}
                        onClick={() => handleMajorSelect('')}
                    >
                        전체
                    </button>

                    {majorCategories.map((major) => (
                        <button
                            key={major}
                            className={`lookup-btn ${selectedMajor === major ? 'active' : ''}`}
                            onClick={() => handleMajorSelect(major)}
                        >
                            {major}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`lookup-section-sub-container ${selectedMajor && subCategories.length > 0 ? 'open' : ''}`}>
                <div className="lookup-section-sub-inner">
                    <div className="lookup-section">
                        <div
                            className="lookup-button-group"
                            ref={subDrag.ref}
                            onMouseDown={subDrag.onMouseDown}
                            style={subDrag.style}
                        >

                            {subCategories.map((sub) => (
                                <button
                                    key={sub}
                                    className={`lookup-btn ${selectedSub === sub ? 'active' : ''}`}
                                    onClick={() => handleSubSelect(sub)}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
