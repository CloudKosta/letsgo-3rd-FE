import { useCallback, useEffect, useState } from "react";
import { getMapSchedule } from "../../../api/myScheduleApi";
import type { MapSchedule } from "../../../types";

/** 일정의 경로 좌표(mapX/mapY) 목록을 불러온다. reload로 갱신 가능. */
export function useMapSchedule(scheduleId?: string) {
  const [maps, setMaps] = useState<MapSchedule[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (scheduleId === undefined) return;

    let ignore = false;
    getMapSchedule(scheduleId)
      .then((data) => !ignore && setMaps(data))
      .catch(() => !ignore && setMaps([]));
    return () => {
      ignore = true;
    };
  }, [scheduleId, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { maps, reload };
}
