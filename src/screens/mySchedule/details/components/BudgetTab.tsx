import { useState } from 'react';
import SaveButton from './SaveButton';

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
                className="w-full min-h-[180px] resize-y bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl p-4 text-[15px] leading-relaxed outline-none transition-all focus:border-blue-500 focus:bg-white read-only:cursor-default"
            />
            {!readOnly && onSave && <SaveButton onClick={handleSave} saving={saving} />}
        </div>
    );
}

export default BudgetTab;
