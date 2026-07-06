import { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import LookupTable from "./LookupTable";
import PlaceBox from "./PlaceBox";
import { fetchPlacePage } from "../../api/placeApi";
import type { PlaceDTO, TabType } from "./interface";
import "./Place.css";

const MAJOR_CODE_MAP: Record<string, string> = {
    "육상레저스포츠": "LS01",
    "수상레저스포츠": "LS02",
    "항공레저스포츠": "LS03",
    "호텔": "AC01",
    "콘도/레지던스": "AC02",
    "펜션/민박": "AC03",
    "모텔": "AC04",
    "캠핑": "AC05",
    "한식": "FD01",
    "기타식문화": "FD02"
};

const SUB_CODE_MAP: Record<string, string> = {
    "자전거 (둘레길)": "LS010200",
    "스케이트": "LS010900",
    "사격장": "LS011200",
    "산책/둘레길": "LS011900",
    "윈드서핑/수상스키": "LS020100",
    "요트": "LS020300",
    "수영": "LS020700",
    "카약/카누": "NO_DATA_KAYAK",
    "헹글라이딩/패러글라이딩": "NO_DATA_PARAGLIDE",
    "호텔": "AC010100",
    "콘도": "NO_DATA_CONDO",
    "레지던스": "NO_DATA_RESIDENCE",
    "펜션": "NO_DATA_PENSION",
    "한옥스테이": "AC030200",
    "민박": "NO_DATA_MINBAK",
    "모텔": "NO_DATA_MOTEL",
    "일반야영장": "NO_DATA_CAMP_GENERAL",
    "오토캠핑장": "NO_DATA_CAMP_AUTO",
    "글램핑장": "NO_DATA_CAMP_GLAMPING",
    "한식": "FD010100",
    "중식": "FD020100",
    "일식": "FD020200",
    "양식": "FD020300",
    "디저트/카페": "FD020400"
};

export default function Place() {
    const [places, setPlaces] = useState<PlaceDTO[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<TabType>('LEISURE');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedSub, setSelectedSub] = useState('');

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const handleTabChange = (tab: TabType) => {
        setCurrentTab(tab);
        setPage(1);
    };

    const handleMajorChange = (major: string) => {
        setSelectedMajor(major);
        setPage(1);
    };

    const handleSubChange = (sub: string) => {
        setSelectedSub(sub);
        setPage(1);
    };

    const handleKeywordChange = (value: string) => {
        setKeyword(value);
        setPage(1);
    };

    useEffect(() => {
        let ignore = false;

        let categoryCode: string | null = null;
        if (selectedSub) {
            categoryCode = SUB_CODE_MAP[selectedSub] || null;
        } else if (selectedMajor) {
            categoryCode = MAJOR_CODE_MAP[selectedMajor] || null;
        }

        setLoading(true);
        fetchPlacePage(currentTab, { category: categoryCode, keyword, page })
            .then(response => {
                if (ignore) return;
                setPlaces(prev => (page === 1 ? response.content : [...prev, ...response.content]));
                setTotalPages(response.totalPages);
            })
            .catch(error => {
                console.error("플레이스 없음:", error);
                if (!ignore && page === 1) {
                    setPlaces([]);
                    setTotalPages(1);
                }
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [currentTab, selectedMajor, selectedSub, keyword, page]);

    useEffect(() => {
        const el = loaderRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && page < totalPages) {
                setPage(prev => prev + 1);
            }
        });
        observer.observe(el);

        return () => observer.disconnect();
    }, [loading, page, totalPages]);

    return (
        <div className="place-container">
            <SearchInput keyword={keyword} setKeyword={handleKeywordChange} />

            <LookupTable
                currentTab={currentTab}
                setCurrentTab={handleTabChange}
                selectedMajor={selectedMajor}
                setSelectedMajor={handleMajorChange}
                selectedSub={selectedSub}
                setSelectedSub={handleSubChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map(place => (
                    <PlaceBox key={place.placeId} place={place} />
                ))}
            </div>

            <div ref={loaderRef} className="h-10" />
        </div>
    );
}
