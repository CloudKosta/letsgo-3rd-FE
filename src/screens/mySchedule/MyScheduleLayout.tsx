import { Routes, Route, useMatch } from 'react-router-dom';
import { mockSchedules } from '../../data/mockSchedules';
import { mockScheduleDetails } from '../../data/mockScheduleDetails';
import { mockCompanionList } from '../../data/mockCompanionList';
import DetailHeader from './details/components/DetailHeader';
import MyScheduleList from './MyScheduleList';
import MyScheduleDetail from './details/MyScheduleDetail';

function MyScheduleLayout() {
    const match = useMatch('/mySchedule/:id');
    const scheduleId = match ? Number(match.params.id) : undefined;

    const schedule = scheduleId !== undefined
        ? mockSchedules.find((s) => s.myScheduleId === scheduleId)
        : undefined;

    const details = scheduleId !== undefined
        ? mockScheduleDetails[scheduleId] ?? []
        : [];

    const companions = scheduleId !== undefined
        ? mockCompanionList[scheduleId] ?? []
        : [];

    return (
        <>
            {match && <DetailHeader schedule={schedule} />}
            <Routes>
                <Route path="/" element={<MyScheduleList />} />
                <Route path="/:id" element={<MyScheduleDetail schedule={schedule} details={details} companions={companions} />} />
            </Routes>
        </>
    );
}

export default MyScheduleLayout;
