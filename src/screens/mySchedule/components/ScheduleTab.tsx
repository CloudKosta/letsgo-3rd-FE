import styles from './css/ScheduleTab.module.css';

type TabType = 'all' | 'shared';

interface ScheduleTabProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

function ScheduleTab({ activeTab, onTabChange }: ScheduleTabProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.group}>
                <button
                    onClick={() => onTabChange('all')}
                    className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
                >
                    전체 일정
                </button>
                <button
                    onClick={() => onTabChange('shared')}
                    className={`${styles.tab} ${activeTab === 'shared' ? styles.tabActive : ''}`}
                >
                    공유된 일정
                </button>
            </div>
        </div>
    );
}

export type { TabType };
export default ScheduleTab;
