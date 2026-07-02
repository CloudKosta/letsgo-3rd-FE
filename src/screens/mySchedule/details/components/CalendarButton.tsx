import { useState, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import 'react-day-picker/style.css';
import styles from './css/CalendarButton.module.css';

interface CalendarButtonProps {
    date?: string;
    onDateChange?: (date: string) => void;
}

function parseDate(s?: string): Date | undefined {
    if (!s) return undefined;
    const [y, m, d] = s.split('-').map(Number);
    if (!y || !m || !d) return undefined;
    return new Date(y, m - 1, d);
}

function formatDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function CalendarButton({ date, onDateChange }: CalendarButtonProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    return (
        <div className={styles.wrapper} ref={ref}>
            <button className={styles.trigger} onClick={() => setOpen((v) => !v)}>
                <Calendar className={styles.icon} />
                {date ?? '날짜 선택'}
            </button>

            {open && (
                <div className={styles.popover}>
                    <DayPicker
                        mode="single"
                        locale={ko}
                        selected={parseDate(date)}
                        onSelect={(d) => {
                            if (d) onDateChange?.(formatDate(d));
                            setOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default CalendarButton;
