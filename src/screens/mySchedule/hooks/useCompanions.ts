import { useCallback, useEffect, useState } from "react";
import type { Colleague } from "../../../types";
import {
  getCompanions,
  addCompanion as apiAddCompanion,
  setCompanionPermission as apiSetCompanionPermission,
} from "../../../api/myScheduleApi";
import { publishToSharedBoard } from "../../../api/shareApi";

export function useCompanions(scheduleId: string) {
  const [companions, setCompanions] = useState<Colleague[]>([]);
  const [publishing, setPublishing] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await getCompanions(scheduleId);
      setCompanions(data);
    } catch {
      setCompanions([]);
    }
  }, [scheduleId]);

  useEffect(() => {
    let ignore = false;
    getCompanions(scheduleId)
      .then((data) => {
        if (!ignore) setCompanions(data);
      })
      .catch(() => {
        if (!ignore) setCompanions([]);
      });
    return () => {
      ignore = true;
    };
  }, [scheduleId]);

  const addCompanion = async (sharedUserId: string) => {
    await apiAddCompanion(scheduleId, sharedUserId);
    await refresh();
  };

  const changePermission = async (sharedUserId: string, permission: string) => {
    await apiSetCompanionPermission(scheduleId, sharedUserId, permission);
    await refresh();
  };

  const publish = async (isAnonymous: boolean) => {
    setPublishing(true);
    try {
      await publishToSharedBoard({ myScheduleId: scheduleId, isAnonymous });
    } finally {
      setPublishing(false);
    }
  };

  return { companions, publishing, publish, addCompanion, changePermission };
}
