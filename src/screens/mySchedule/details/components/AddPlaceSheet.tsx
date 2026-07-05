import { useState } from "react";
import { X, Plus, ImageOff } from "lucide-react";
import { usePlaceSearch } from "../../../../hooks/usePlaceSearch";
import type { PlaceItem, PlaceTab } from "../../../../api/placeApi";
import "./css/AddPlaceSheet.css";

interface AddPlaceSheetProps {
  onClose: () => void;
  onAdd: (place: PlaceItem) => Promise<void>;
}

const TABS: { key: PlaceTab; label: string }[] = [
  { key: "LEISURE", label: "레저" },
  { key: "STAY", label: "숙박" },
  { key: "RESTAURANT", label: "음식" },
];

export default function AddPlaceSheet({ onClose, onAdd }: AddPlaceSheetProps) {
  const { tab, setTab, keyword, setKeyword, places, loading } = usePlaceSearch();
  const [addingId, setAddingId] = useState<number | null>(null);

  const handleAdd = async (place: PlaceItem) => {
    setAddingId(place.placeId);
    try {
      await onAdd(place);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="add-place-overlay" onClick={onClose}>
      <div className="add-place-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="add-place-header">
          <h2 className="add-place-title">장소 추가</h2>
          <button className="add-place-close" onClick={onClose} aria-label="닫기">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="add-place-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`add-place-tab ${tab === t.key ? "add-place-tab-active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <input
          className="add-place-search"
          placeholder="장소 이름으로 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <div className="add-place-list">
          {loading && <p className="add-place-empty">불러오는 중...</p>}
          {!loading && places.length === 0 && <p className="add-place-empty">검색 결과가 없습니다.</p>}
          {!loading &&
            places.map((place) => (
              <div key={place.placeId} className="add-place-row">
                {place.firstImage ? (
                  <img src={place.firstImage} alt={place.title} className="add-place-thumb" />
                ) : (
                  <div className="add-place-thumb add-place-thumb-empty">
                    <ImageOff className="w-5 h-5 text-gray-300" />
                  </div>
                )}
                <div className="add-place-info">
                  <p className="add-place-name">{place.title}</p>
                  <p className="add-place-addr">{place.addr1 || "주소 없음"}</p>
                </div>
                <button
                  className="add-place-add"
                  onClick={() => handleAdd(place)}
                  disabled={addingId === place.placeId}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
