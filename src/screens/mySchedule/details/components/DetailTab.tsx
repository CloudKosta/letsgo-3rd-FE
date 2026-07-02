import styles from './css/DetailTab.module.css';

type DetailTabType = 'schedule' | 'budget' | 'todo' | 'share';

const tabs: { key: DetailTabType; label: string }[] = [
    { key: 'schedule', label: '일정' },
    { key: 'budget', label: '예산' },
    { key: 'todo', label: 'TO-DO' },
    { key: 'share', label: '공유' },
];

interface DetailTabProps {
    activeTab: DetailTabType;
    onTabChange: (tab: DetailTabType) => void;
}

function DetailTab({ activeTab, onTabChange }: DetailTabProps) {
    return (
        <div className={styles.wrapper}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export type { DetailTabType };
export default DetailTab;
