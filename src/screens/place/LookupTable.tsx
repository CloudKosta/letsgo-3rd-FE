import { useState } from "react";
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

type TabType = keyof typeof CATEGORY_MAP;

export default function LookupTable() {
    const [currentTab, setCurrentTab] = useState<TabType>('LEISURE');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedSub, setSelectedSub] = useState('');

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
                <button onClick={() => handleTabChange('LEISURE')}>레저스포츠</button>
                <button onClick={() => handleTabChange('STAY')}>숙소</button>
                <button onClick={() => handleTabChange('RESTAURANT')}>음식점</button>
            </div>

            <div className="lookup-section">
                <div className="lookup-section-title">중분류</div>
                <div className="lookup-button-group">

                    <button onClick={() => handleMajorSelect('')}>전체</button>

                    {majorCategories.map((major) => (
                        <button key={major} onClick={() => handleMajorSelect(major)}>
                            {major}
                        </button>
                    ))}
                </div>
            </div>

            {selectedMajor && subCategories.length > 0 && (
                <div className="lookup-section">
                    <div className="lookup-section-title">소분류</div>
                    <div className="lookup-button-group">
                        <button onClick={() => setSelectedSub('')}>전체</button>
                        {subCategories.map((sub) => (
                            <button key={sub} onClick={() => handleSubSelect(sub)}>
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

