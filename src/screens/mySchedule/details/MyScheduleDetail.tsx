import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import type { MySchedule, MyScheduleDetail as MyScheduleDetailType, Colleague } from '../../../types';
import DetailTab from './components/DetailTab';
import type { DetailTabType } from './components/DetailTab';
import CalendarButton from './components/CalendarButton';
import RouteMap from './components/RouteMap';
import PlaceList from './components/PlaceList';
import ShareTab from './components/ShareTab';
import styles from './MyScheduleDetail.module.css';

interface MyScheduleDetailProps {
    schedule?: MySchedule;
    details?: MyScheduleDetailType[];
    companions?: Colleague[];
}

function MyScheduleDetail({ schedule, details = [], companions = [] }: MyScheduleDetailProps) {
    const [activeTab, setActiveTab] = useState<DetailTabType>('schedule');
    const [date, setDate] = useState(schedule?.startAt ?? '');

    if (!schedule) {
        return <div className={styles.notFound}>일정을 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.dateRow}>
                <CalendarButton date={date} onDateChange={setDate} />
                <button className={styles.deleteBtn}>
                    <Trash2 className={styles.deleteIcon} />
                    삭제하기
                </button>
            </div>

            <DetailTab activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={styles.content}>
                {activeTab === 'schedule' && (
                    <div className={styles.section}>
                        <RouteMap places={details} />
                        <PlaceList places={details} />
                    </div>
                )}

                {activeTab === 'budget' && (
                    <ul className={styles.infoList}>
                        {details.map((d) => (
                            <li key={d.visitId} className={styles.infoItem}>
                                <span className={styles.infoTitle}>{d.title}</span>
                                <span className={styles.infoText}>{d.budgetDetail}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === 'todo' && (
                    <ul className={styles.infoList}>
                        {details.map((d) => (
                            <li key={d.visitId} className={styles.infoItem}>
                                <span className={styles.infoTitle}>{d.title}</span>
                                <span className={styles.infoText}>{d.todoDetail}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === 'share' && (
                    <ShareTab myScheduleId={schedule.myScheduleId} companions={companions} />
                )}
            </div>
        </div>
    );
}

export default MyScheduleDetail;
