import { useEffect, useState } from "react";
import { getMyScheduleList } from "../../../api/myScheduleApi";
import { useAuthStore } from "../../../store/authStore";
import type { MySchedule } from "../../../types";

export function useMySchedule() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [schedules, setSchedules] = useState<MySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setSchedules([]);
      setError("로그인을 하여 내 일정을 추가해보세요.");
      setLoading(false);
      return;
    }

    let ignore = false;

    async function fetchSchedules() {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyScheduleList();
        if (!ignore) setSchedules(data);
      } catch {
        if (!ignore) setError("일정을 불러오지 못했습니다.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchSchedules();

    return () => {
      ignore = true;
    };
  }, [isLoggedIn]);

  return { schedules, loading, error };
}
