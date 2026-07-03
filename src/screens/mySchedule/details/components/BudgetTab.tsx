import { useState } from 'react';

interface BudgetTabProps {
    initialContent?: string;
    onSave?: (content: string) => Promise<void> | void;
    readOnly?: boolean;
}

function BudgetTab({ initialContent = '', onSave, readOnly = false }: BudgetTabProps) {
    const [value, setValue] = useState(initialContent);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave?.(value);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-3 px-1">
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                readOnly={readOnly}
                placeholder={readOnly ? '' : '예산 내역을 입력하세요 (예: 숙박 120,000 / 식비 80,000)'}
                className="w-full min-h-[180px] resize-y bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl p-4 text-[15px] leading-relaxed outline-none transition-all focus:border-[#ff7a00] focus:bg-white read-only:cursor-default"
            />
            {!readOnly && onSave && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="px-5 py-2.5 rounded-2xl bg-[#ff7a00] text-white text-sm font-bold shadow-sm active:scale-[0.98] disabled:opacity-60"
                    >
                        {saving ? '저장 중...' : '저장'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default BudgetTab;
