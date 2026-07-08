import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useMySchedule } from './hooks/useMySchedule';
import ScheduleTab from './components/ScheduleTab';
import type { TabType } from './components/ScheduleTab';
import SortDropdown from './components/SortDropdown';
import { sortOptions } from './components/SortDropdown';
import type { SortOption } from './components/SortDropdown';
import ScheduleCard from './components/ScheduleCard';
import SearchBox from './details/components/SearchBox';
import Footer from '../../components/layout/Footer';
import styles from './MyScheduleList.module.css';

function MyScheduleList() {
    const { schedules, loading, error } = useMySchedule();
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0]);
    const [keyword, setKeyword] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const query = submittedQuery.trim().toLowerCase();
    const filtered = schedules.filter((s) => {
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
            
            </div>

            <ScheduleTab activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={styles.filterRow}>
                <div className={styles.searchCell}>
                    <SearchBox
                        value={keyword}
                        onChange={setKeyword}
                        onSearch={setSubmittedQuery}
                    />
                </div>
                <SortDropdown activeSort={activeSort} onSortChange={setActiveSort} />
            </div>

            <div className={styles.list}>
                {loading && (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyText}>불러오는 중...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyText}>{error}</p>
                    </div>
                )}

                {!loading && !error && sorted.map((schedule) => (
                    <ScheduleCard key={schedule.myScheduleId} schedule={schedule} />
                ))}

                {!loading && !error && sorted.length === 0 && (
                    <div className={styles.emptyState}>
                        <Calendar className={styles.emptyIcon} />
                        <p className={styles.emptyText}>일정이 없습니다</p>
                    </div>
                )}

                <Footer />
            </div>
        </div>
    );
}

export default MyScheduleList;
