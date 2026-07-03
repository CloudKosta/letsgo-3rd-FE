import { useCallback } from "react";
import {
  updateTodo,
  updateBudget,
  updateStartAt,
  deleteSchedule,
} from "../../../api/myScheduleApi";

export function useScheduleMutations(scheduleId?: number) {
  const saveTodo = useCallback(
    async (content: string) => {
      if (scheduleId === undefined) return;
      await updateTodo(scheduleId, content);
    },
    [scheduleId]
  );

  const saveBudget = useCallback(
    async (content: string) => {
      if (scheduleId === undefined) return;
      await updateBudget(scheduleId, content);
    },
    [scheduleId]
  );

  const saveStartAt = useCallback(
    async (startAt: string) => {
      if (scheduleId === undefined) return;
      await updateStartAt(scheduleId, startAt);
    },
    [scheduleId]
  );

  const removeSchedule = useCallback(async () => {
    if (scheduleId === undefined) return false;
    return deleteSchedule(scheduleId);
  }, [scheduleId]);

  return { saveTodo, saveBudget, saveStartAt, removeSchedule };
}
