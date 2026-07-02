import { useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { mockSchedules } from '../../data/mockSchedules';
import ScheduleTab from './components/ScheduleTab';
import type { TabType } from './components/ScheduleTab';
import SortDropdown from './components/SortDropdown';
import { sortOptions } from './components/SortDropdown';
import type { SortOption } from './components/SortDropdown';
import ScheduleCard from './components/ScheduleCard';
import SearchBox from './details/components/SearchBox';
import styles from './MyScheduleList.module.css';

function MyScheduleList() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0]);
    const [keyword, setKeyword] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const query = submittedQuery.trim().toLowerCase();
    const filtered = mockSchedules.filter((s) => {
        if (activeTab === 'shared' && !s.isShared) return false;
        if (query && !s.myScheduleTitle.toLowerCase().includes(query)) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        let cmp = 0;
        if (activeSort.field === 'date') cmp = a.startAt.localeCompare(b.startAt);
        else if (activeSort.field === 'name') cmp = a.myScheduleTitle.localeCompare(b.myScheduleTitle);
        return activeSort.asc ? cmp : -cmp;
    });

    return (
        <div className={styles.page}>
            <div className={styles.titleBar}>
                <h1 className={styles.title}>내 일정목록</h1>
                <button className={styles.profileBtn} aria-label="프로필">
                    <User className={styles.profileIcon} />
                </button>
            </div>

            <ScheduleTab activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={styles.filterRow}>
                <div className={styles.searchCell}>
                    <SearchBox
                        value={keyword}
                        onChange={setKeyword}
                        onSearch={setSubmittedQuery}
                        placeholder="일정 이름으로 검색"
                    />
                </div>
                <SortDropdown activeSort={activeSort} onSortChange={setActiveSort} />
            </div>

            <div className={styles.list}>
                {sorted.map((schedule) => (
                    <ScheduleCard key={schedule.myScheduleId} schedule={schedule} />
                ))}

                {sorted.length === 0 && (
                    <div className={styles.emptyState}>
                        <Calendar className={styles.emptyIcon} />
                        <p className={styles.emptyText}>일정이 없습니다</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyScheduleList;
