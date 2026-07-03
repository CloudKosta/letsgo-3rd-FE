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
import { useScheduleMutations } from '../hooks/useScheduleMutations';
import styles from './MyScheduleDetail.module.css';

interface MyScheduleDetailProps {
    scheduleId?: number;
    info?: ScheduleDetailInfo | null;
    route?: RouteSchedule[];
    permission?: string | null;
    loading?: boolean;
    error?: string | null;
    patchInfo?: (partial: Partial<ScheduleDetailInfo>) => void;
}

function MyScheduleDetail({ scheduleId, info, route = [], permission, loading, error, patchInfo }: MyScheduleDetailProps) {
    const navigate = useNavigate();
    const { saveTodo, saveBudget, saveStartAt, removeSchedule } = useScheduleMutations(scheduleId);
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

    const isOwner = permission === 'OWNER';
    const canEdit = isOwner || permission === 'W';

    const handleDateChange = async (next: string) => {
        setDate(next);
        try {
            await saveStartAt(next);
            patchInfo?.({ startAt: next });
        } catch (err) {
            alert(err instanceof Error ? err.message : '날짜 저장에 실패했습니다.');
        }
    };

    const handleSaveTodo = async (content: string) => {
        try {
            await saveTodo(content);
            patchInfo?.({ todoDetail: content });
            alert('할 일이 저장되었습니다.');
        } catch (err) {
            alert(err instanceof Error ? err.message : '할 일 저장에 실패했습니다.');
        }
    };

    const handleSaveBudget = async (content: string) => {
        try {
            await saveBudget(content);
            patchInfo?.({ budgetDetail: content });
            alert('예산이 저장되었습니다.');
        } catch (err) {
            alert(err instanceof Error ? err.message : '예산 저장에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('이 일정을 삭제할까요?')) return;
        try {
            const ok = await removeSchedule();
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
            {!isOwner && (
                <div
                    className={`mx-1 mb-3 px-4 py-2.5 rounded-2xl text-[13px] font-medium ${
                        canEdit
                            ? 'bg-[#e7f5ff] text-[#1c7ed6] border border-[#a5d8ff]'
                            : 'bg-[#f8f9fa] text-[#868e96] border border-[#e9ecef]'
                    }`}
                >
                    {canEdit ? '공유받은 일정 · 편집 가능' : '공유받은 일정 · 읽기 전용'}
                </div>
            )}

            <div className={styles.dateRow}>
                <CalendarButton date={date} onDateChange={handleDateChange} disabled={!canEdit} />
                {isOwner && (
                    <button className={styles.deleteBtn} onClick={handleDelete}>
                        <Trash2 className={styles.deleteIcon} />
                        삭제하기
                    </button>
                )}
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
                    <BudgetTab
                        initialContent={info.budgetDetail ?? ''}
                        onSave={canEdit ? handleSaveBudget : undefined}
                        readOnly={!canEdit}
                    />
                )}

                {activeTab === 'todo' && (
                    <TodoTab
                        initialContent={info.todoDetail ?? ''}
                        onSave={canEdit ? handleSaveTodo : undefined}
                        readOnly={!canEdit}
                    />
                )}

                {activeTab === 'share' && (
                    <ShareTab myScheduleId={scheduleId} isOwner={isOwner} />
                )}
            </div>
        </div>
    );
}

export default MyScheduleDetail;
