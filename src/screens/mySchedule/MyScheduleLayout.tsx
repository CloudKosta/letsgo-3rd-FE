import { Routes, Route, useMatch } from 'react-router-dom';
import DetailHeader from './details/components/DetailHeader';
import MyScheduleList from './MyScheduleList';
import MyScheduleDetail from './details/MyScheduleDetail';
import { useScheduleDetail } from './hooks/useScheduleDetail';

function MyScheduleLayout() {
    const match = useMatch('/mySchedule/:id');
    const scheduleId = match ? Number(match.params.id) : undefined;

    const { info, route, permission, loading, error, patchInfo } = useScheduleDetail(scheduleId);

    return (
        <>
            {match && <DetailHeader title={info?.scheduleTitle} />}
            <Routes>
                <Route path="/" element={<MyScheduleList />} />
                <Route
                    path="/:id"
                    element={
                        <MyScheduleDetail
                            scheduleId={scheduleId}
                            info={info}
                            route={route}
                            permission={permission}
                            loading={loading}
                            error={error}
                            patchInfo={patchInfo}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default MyScheduleLayout;
