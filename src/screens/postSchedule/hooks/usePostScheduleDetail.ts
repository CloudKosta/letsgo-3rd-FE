import { useEffect, useState } from "react";
import { getPostScheduleDetail } from "../../../api/postScheduleApi";
import type { PostScheduleDetail } from "../../../types";

const detailRequestMap = new Map<string, Promise<PostScheduleDetail>>();

function getPostScheduleDetailOnce(postId: string) {
  const currentRequest = detailRequestMap.get(postId);
  if (currentRequest) return currentRequest;

  const request = getPostScheduleDetail(postId).finally(() => {
    detailRequestMap.delete(postId);
  });
  detailRequestMap.set(postId, request);

  return request;
}

export function usePostScheduleDetail(postId?: string) {
  const [detail, setDetail] = useState<PostScheduleDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const currentPostId = postId;
    let ignore = false;

    async function fetchDetail() {
      setLoading(true);
      setError(null);

      try {
        const data = await getPostScheduleDetailOnce(currentPostId);
        if (!ignore) setDetail(data);
      } catch {
        if (!ignore) {
          setDetail(null);
          setError("로그인 후 확인해보세요.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchDetail();

    return () => {
      ignore = true;
    };
  }, [postId]);

  return {
    detail: postId ? detail : null,
    loading,
    error: postId ? error : "로그인 후 확인해보세요.",
  };
}
