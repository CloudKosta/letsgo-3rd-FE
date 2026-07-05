interface SaveButtonProps {
    onClick: () => void;
    saving: boolean;
    label?: string;
}

/** 편집 탭 공용 저장 버튼. 우측 정렬, 블루 테마. */
export default function SaveButton({ onClick, saving, label = '저장' }: SaveButtonProps) {
    return (
        <div className="flex justify-end">
            <button
                type="button"
                onClick={onClick}
                disabled={saving}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-sm active:scale-[0.98] disabled:opacity-60 transition-transform"
            >
                {saving ? '저장 중...' : label}
            </button>
        </div>
    );
}
