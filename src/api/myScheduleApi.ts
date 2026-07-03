import axios from "axios";
import { api } from "./axiosInstance";
import type {
  Colleague,
  MySchedule,
  ScheduleDetailInfo,
  RouteSchedule,
} from "../types";

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

export interface ScheduleDetailResponse {
  schedule: ScheduleDetailInfo;
  route: RouteSchedule[];
  permission: string;
}

function getErrorMessage(e: unknown, fallback: string): string {
  if (axios.isAxiosError(e)) {
    return e.response?.data?.message ?? fallback;
  }
  return fallback;
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

export async function getMyScheduleList(): Promise<MySchedule[]> {
  const res = await api.get<PageResponse<MyScheduleVO>>("/myschedule/api/list");
  return res.data.content.map(toMySchedule);
}

export async function getScheduleDetail(scheduleId: number): Promise<ScheduleDetailResponse> {
  const res = await api.get<ScheduleDetailResponse>(`/myschedule/api/${scheduleId}/detail`);
  return res.data;
}

export async function updateTodo(scheduleId: number, todoDetail: string): Promise<void> {
  try {
    await api.put(`/myschedule/api/${scheduleId}/todo`, { todoDetail });
  } catch (e) {
    throw new Error(getErrorMessage(e, "할 일 저장에 실패했습니다."), { cause: e });
  }
}

export async function updateBudget(scheduleId: number, budgetDetail: string): Promise<void> {
  try {
    await api.put(`/myschedule/api/${scheduleId}/budget`, { budgetDetail });
  } catch (e) {
    throw new Error(getErrorMessage(e, "예산 저장에 실패했습니다."), { cause: e });
  }
}

export async function updateStartAt(scheduleId: number, startAt: string): Promise<void> {
  try {
    await api.put(`/myschedule/api/${scheduleId}/startAt`, { startAt });
  } catch (e) {
    throw new Error(getErrorMessage(e, "날짜 저장에 실패했습니다."), { cause: e });
  }
}

export async function getCompanions(scheduleId: number): Promise<Colleague[]> {
  const res = await api.get<Colleague[]>(`/myschedule/api/${scheduleId}/companion`);
  return res.data;
}

export async function addCompanion(scheduleId: number, sharedUserId: string): Promise<boolean> {
  try {
    const res = await api.post<boolean>(`/myschedule/api/${scheduleId}/companion`, { sharedUserId });
    return res.data;
  } catch (e) {
    throw new Error(getErrorMessage(e, "동반자 추가에 실패했습니다."), { cause: e });
  }
}

export async function setCompanionPermission(
  scheduleId: number,
  sharedUserId: string,
  permission: string
): Promise<boolean> {
  try {
    const res = await api.put<boolean>(`/myschedule/api/${scheduleId}/companion/permission`, {
      sharedUserId,
      permission,
    });
    return res.data;
  } catch (e) {
    throw new Error(getErrorMessage(e, "권한 변경에 실패했습니다."), { cause: e });
  }
}

export async function deleteSchedule(scheduleId: number): Promise<boolean> {
  try {
    const res = await api.delete<boolean>(`/myschedule/api/${scheduleId}`);
    return res.data;
  } catch (e) {
    throw new Error(getErrorMessage(e, "일정 삭제에 실패했습니다."), { cause: e });
  }
}
