import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import styles from './css/SortDropdown.module.css';

export interface SortOption {
    key: string;
    label: string;
    field: 'date' | 'name';
    asc: boolean;
}

export const sortOptions: SortOption[] = [
    { key: 'date-desc', label: '날짜 ↓', field: 'date', asc: false },
    { key: 'date-asc', label: '날짜 ↑', field: 'date', asc: true },
    { key: 'name-desc', label: '제목 ↓', field: 'name', asc: false },
    { key: 'name-asc', label: '제목 ↑', field: 'name', asc: true },
];

interface SortDropdownProps {
    activeSort: SortOption;
    onSortChange: (option: SortOption) => void;
}

function SortDropdown(props: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setOpen(false));

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={ref}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className={styles.trigger}
                >
                    {props.activeSort.label}
                    <ChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
                </button>

                {open && (
                    <div className={styles.menu}>
                        {sortOptions.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => {
                                    props.onSortChange(option);
                                    setOpen(false);
                                }}
                                className={`${styles.menuItem} ${props.activeSort.key === option.key ? styles.menuItemActive : ''}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SortDropdown;
