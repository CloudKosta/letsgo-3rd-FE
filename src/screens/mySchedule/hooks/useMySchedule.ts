import { useEffect, useState } from "react";
import { api } from "../../../api/axiosInstance";
import type { MySchedule } from "../../../types";

interface MyScheduleVO {
  myScheduleId: string;
  myScheduleTitle: string;
  startAt: string;
  isShared: string;
  placeTitle: string;
  addr1: string;
  firstImage: string;
}

interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

function toMySchedule(vo: MyScheduleVO): MySchedule {
  const places = vo.placeTitle ? vo.placeTitle.split(" / ") : [];
  return {
    myScheduleId: Number(vo.myScheduleId),
    myScheduleTitle: vo.myScheduleTitle,
    startAt: vo.startAt,
    placeCount: places.length,
    placeTitle: places,
    isShared: vo.isShared === "1" || vo.isShared === "true",
  };
}

export function useMySchedule() {
  const [schedules, setSchedules] = useState<MySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchSchedules() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<PageResponse<MyScheduleVO>>("/myschedule/api/list");
        if (!ignore) setSchedules(res.data.content.map(toMySchedule));
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
  }, []);

  return { schedules, loading, error };
}
