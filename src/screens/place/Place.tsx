import { useState, useEffect, useRef } from "react";
import { api } from "../../api/axiosInstance";
import SearchInput from "./SearchInput";
import LookupTable from "./LookupTable";
import PlaceBox from "./PlaceBox";
import Footer from "../../components/layout/Footer";
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


    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const prevQueryRef = useRef({ currentTab, selectedMajor, selectedSub, keyword });

    useEffect(() => {
        const queryChanged =
            prevQueryRef.current.currentTab !== currentTab ||
            prevQueryRef.current.selectedMajor !== selectedMajor ||
            prevQueryRef.current.selectedSub !== selectedSub ||
            prevQueryRef.current.keyword !== keyword;

        let activePage = page;

        if (queryChanged) {

            prevQueryRef.current = { currentTab, selectedMajor, selectedSub, keyword };


            setPlaces([]);
            setHasMore(true);

            if (page !== 1) {

                setPage(1);
                return;
            } else {
                activePage = 1;
            }
        }

        if (!queryChanged && !hasMore) return;
        if (isLoading) return;
        setIsLoading(true);

        let endpoint = "/list/leisure";
        if (currentTab === 'STAY') {
            endpoint = "/list/stay";
        } else if (currentTab === 'RESTAURANT') {
            endpoint = "/list/restaurant";
        }

        let categoryCode: string | null = null;
        if (selectedSub) {
            categoryCode = SUB_CODE_MAP[selectedSub] || null;
        } else if (selectedMajor) {
            categoryCode = MAJOR_CODE_MAP[selectedMajor] || null;
        }

        api.get(endpoint, {
            params: {
                category: categoryCode,
                keyword: keyword || null,
                page: activePage,
                sortOrder: 'popular'

            }
        })
            .then(response => {
                const newPlaces = response.data.content || [];
                const currentPage = response.data.page;
                const totalPages = response.data.totalPages;

                setPlaces(prev => {
                    if (activePage === 1) {
                        return newPlaces;
                    }
                    const existingIds = new Set(prev.map(p => p.placeId));
                    const filteredNew = newPlaces.filter((p: PlaceDTO) => !existingIds.has(p.placeId));
                    return [...prev, ...filteredNew];
                });

                setHasMore(currentPage < totalPages);
            })
            .catch(error => {
                console.error("플레이스 없음:", error);
                setHasMore(false);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [currentTab, selectedMajor, selectedSub, keyword, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        const currentObserver = observerRef.current;
        if (currentObserver) {
            observer.observe(currentObserver);
        }

        return () => {
            if (currentObserver) {
                observer.unobserve(currentObserver);
            }
        };
    }, [hasMore, isLoading]);

    return (
        <div className="place-container mb-2">
            <SearchInput keyword={keyword} setKeyword={setKeyword} />

            <LookupTable
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                selectedMajor={selectedMajor}
                setSelectedMajor={setSelectedMajor}
                selectedSub={selectedSub}
                setSelectedSub={setSelectedSub}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map(place => (
                    <PlaceBox key={place.placeId} place={place} />
                ))}
            </div>

            {hasMore && (
                <div ref={observerRef} className="h-16 flex items-center justify-center text-gray-400 text-sm font-medium">
                    {isLoading ? "불러오는 중..." : "더 불러오기"}
                </div>
            )}

            <Footer />
        </div>
    );
}
