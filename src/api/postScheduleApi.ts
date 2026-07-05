import { api } from "./axiosInstance";
import type { PostSchedule, PostScheduleDetail } from "../types";

interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface PostScheduleListParams {
  keyword?: string;
  sortOrder?: string;
  page?: number;
}

export async function getPostScheduleList(params: PostScheduleListParams = {}): Promise<PageResponse<PostSchedule>> {
  const res = await api.get<PageResponse<PostSchedule>>("/postschedule/api/list", { params });
  return res.data;
}

export async function getMyPostScheduleList(params: PostScheduleListParams = {}): Promise<PageResponse<PostSchedule>> {
  const res = await api.get<PageResponse<PostSchedule>>("/postschedule/api/mylist", { params });
  return res.data;
}

export async function getPostScheduleDetail(postId: string): Promise<PostScheduleDetail> {
  const res = await api.get<PostScheduleDetail>(`/postschedule/api/${postId}/detail`);
  return res.data;
}

export async function plusPostScheduleLike(postId: string): Promise<number> {
  const res = await api.put<number>(`/postschedule/api/${postId}/plusLike`);
  return res.data;
}

export async function copyPostScheduleToMySchedule(postId: string): Promise<void> {
  await api.put(`/postschedule/api/${postId}/copy`);
}

export async function reportPostSchedule(postId: string, reason: string): Promise<void> {
  await api.post(`/postschedule/api/${postId}/report`, { reason });
}
