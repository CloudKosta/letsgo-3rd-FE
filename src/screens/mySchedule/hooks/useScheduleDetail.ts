import { useCallback, useEffect, useState } from "react";
import { getScheduleDetail } from "../../../api/myScheduleApi";
import type { ScheduleDetailInfo, RouteSchedule } from "../../../types";

export function useScheduleDetail(scheduleId?: number) {
  const [info, setInfo] = useState<ScheduleDetailInfo | null>(null);
  const [route, setRoute] = useState<RouteSchedule[]>([]);
  const [permission, setPermission] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scheduleId === undefined) return;

    let ignore = false;

    async function fetchDetail() {
      setLoading(true);
      setError(null);
      try {
        const data = await getScheduleDetail(scheduleId!);
        if (!ignore) {
          setInfo(data.schedule);
          setRoute(data.route);
          setPermission(data.permission);
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

  const patchInfo = useCallback((partial: Partial<ScheduleDetailInfo>) => {
    setInfo((prev) => (prev ? { ...prev, ...partial } : prev));
  }, []);

  return { info, route, permission, loading, error, patchInfo };
}
