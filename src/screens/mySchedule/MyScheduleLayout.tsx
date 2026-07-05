import { Routes, Route, useMatch } from 'react-router-dom';
import DetailHeader from './details/components/DetailHeader';
import MyScheduleList from './MyScheduleList';
import MyScheduleDetail from './details/MyScheduleDetail';
import { useScheduleDetail } from './hooks/useScheduleDetail';

function MyScheduleLayout() {
    const match = useMatch('/mySchedule/:id');
    // my_schedule_id는 'S001'처럼 문자열이므로 숫자 변환하지 않고 그대로 사용한다.
    const scheduleId = match ? match.params.id : undefined;

    const { info, route, permission, loading, error, patchInfo, reload } = useScheduleDetail(scheduleId);

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
                            reload={reload}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default MyScheduleLayout;
