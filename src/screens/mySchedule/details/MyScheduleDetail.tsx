import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import type { ScheduleDetailInfo, RouteSchedule } from '../../../types';
import DetailTab from './components/DetailTab';
import type { DetailTabType } from './components/DetailTab';
import CalendarButton from './components/CalendarButton';
import RouteMap from './components/RouteMap';
import PlaceList from './components/PlaceList';
import ShareTab from './components/ShareTab';
import TodoTab from './components/TodoTab';
import BudgetTab from './components/BudgetTab';
import { updateTodo, updateBudget, updateStartAt, deleteSchedule } from '../../../api/myScheduleApi';
import styles from './MyScheduleDetail.module.css';

interface MyScheduleDetailProps {
    scheduleId?: number;
    info?: ScheduleDetailInfo | null;
    route?: RouteSchedule[];
    loading?: boolean;
    error?: string | null;
}

function MyScheduleDetail({ scheduleId, info, route = [], loading, error }: MyScheduleDetailProps) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<DetailTabType>('schedule');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (info) setDate(info.startAt);
    }, [info]);

    if (loading) {
        return <div className={styles.notFound}>불러오는 중...</div>;
    }
    if (error) {
        return <div className={styles.notFound}>{error}</div>;
    }
    if (!info || scheduleId === undefined) {
        return <div className={styles.notFound}>일정을 찾을 수 없습니다.</div>;
    }

    const handleDateChange = async (next: string) => {
        setDate(next);
        try {
            await updateStartAt(scheduleId, next);
        } catch (err) {
            alert(err instanceof Error ? err.message : '날짜 저장에 실패했습니다.');
        }
    };

    const handleSaveTodo = async (content: string) => {
        try {
            await updateTodo(scheduleId, content);
            alert('할 일이 저장되었습니다.');
        } catch (err) {
            alert(err instanceof Error ? err.message : '할 일 저장에 실패했습니다.');
        }
    };

    const handleSaveBudget = async (content: string) => {
        try {
            await updateBudget(scheduleId, content);
            alert('예산이 저장되었습니다.');
        } catch (err) {
            alert(err instanceof Error ? err.message : '예산 저장에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('이 일정을 삭제할까요?')) return;
        try {
            const ok = await deleteSchedule(scheduleId);
            if (ok) {
                navigate('/mySchedule');
            } else {
                alert('일정 삭제에 실패했습니다.');
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : '일정 삭제에 실패했습니다.');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.dateRow}>
                <CalendarButton date={date} onDateChange={handleDateChange} />
                <button className={styles.deleteBtn} onClick={handleDelete}>
                    <Trash2 className={styles.deleteIcon} />
                    삭제하기
                </button>
            </div>

            <DetailTab activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={styles.content}>
                {activeTab === 'schedule' && (
                    <div className={styles.section}>
                        <RouteMap places={route} />
                        <PlaceList places={route} />
                    </div>
                )}

                {activeTab === 'budget' && (
                    <BudgetTab initialContent={info.budgetDetail ?? ''} onSave={handleSaveBudget} />
                )}

                {activeTab === 'todo' && (
                    <TodoTab initialContent={info.todoDetail ?? ''} onSave={handleSaveTodo} />
                )}

                {activeTab === 'share' && (
                    <ShareTab myScheduleId={scheduleId} />
                )}
            </div>
        </div>
    );
}

export default MyScheduleDetail;
