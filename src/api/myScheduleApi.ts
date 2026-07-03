import axios from "axios";
import { api } from "./axiosInstance";
import type { Colleague } from "../types";

function getErrorMessage(e: unknown, fallback: string): string {
  if (axios.isAxiosError(e)) {
    return e.response?.data?.message ?? fallback;
  }
  return fallback;
}

export async function updateTodo(scheduleId: number, todoDetail: string): Promise<void> {
  try {
    await api.put(`/myschedule/api/${scheduleId}/todo`, { todoDetail });
  } catch (e) {
    throw new Error(getErrorMessage(e, "할 일 저장에 실패했습니다."));
  }
}

export async function updateBudget(scheduleId: number, budgetDetail: string): Promise<void> {
  try {
    await api.put(`/myschedule/api/${scheduleId}/budget`, { budgetDetail });
  } catch (e) {
    throw new Error(getErrorMessage(e, "예산 저장에 실패했습니다."));
  }
}

export async function updateStartAt(scheduleId: number, startAt: string): Promise<void> {
  try {
    await api.put(`/myschedule/api/${scheduleId}/startAt`, { startAt });
  } catch (e) {
    throw new Error(getErrorMessage(e, "날짜 저장에 실패했습니다."));
  }
}

export async function getCompanions(scheduleId: number): Promise<Colleague[]> {
  const res = await api.get<Colleague[]>(`/myschedule/api/${scheduleId}/companion`);
  return res.data;
}

export async function deleteSchedule(scheduleId: number): Promise<boolean> {
  try {
    const res = await api.delete<boolean>(`/myschedule/api/${scheduleId}`);
    return res.data;
  } catch (e) {
    throw new Error(getErrorMessage(e, "일정 삭제에 실패했습니다."));
  }
}
