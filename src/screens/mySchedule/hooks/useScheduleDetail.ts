import { useEffect, useState } from "react";
import { api } from "../../../api/axiosInstance";
import type { ScheduleDetailInfo, RouteSchedule } from "../../../types";

interface ScheduleDetailResponse {
  schedule: ScheduleDetailInfo;
  route: RouteSchedule[];
}

export function useScheduleDetail(scheduleId?: number) {
  const [info, setInfo] = useState<ScheduleDetailInfo | null>(null);
  const [route, setRoute] = useState<RouteSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scheduleId === undefined) return;

    let ignore = false;

    async function fetchDetail() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<ScheduleDetailResponse>(`/myschedule/api/${scheduleId}/detail`);
        if (!ignore) {
          setInfo(res.data.schedule);
          setRoute(res.data.route);
        }
      } catch {
        if (!ignore) setError("일정을 불러오지 못했습니다.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [scheduleId]);

  return { info, route, loading, error };
}
