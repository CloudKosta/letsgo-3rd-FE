import { useEffect, useState } from "react";
import { getMyPostScheduleList, getPostScheduleList } from "../../../api/postScheduleApi";
import type { PostSchedule } from "../../../types";
import { getPostScheduleSortOrder, type SortType } from "../constants/sortOptions";

type PostScheduleListTab = "all" | "mine";

interface UsePostScheduleListParams {
  activeTab: PostScheduleListTab;
  keyword: string;
  sortOrder: SortType;
  page?: number;
}

export function usePostScheduleList({
  activeTab,
  keyword,
  sortOrder,
  page = 1,
}: UsePostScheduleListParams) {
  const [posts, setPosts] = useState<PostSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const params = {
          keyword: keyword.trim() || undefined,
          sortOrder: getPostScheduleSortOrder(sortOrder),
          page,
        };
        const data =
          activeTab === "mine"
            ? await getMyPostScheduleList(params)
            : await getPostScheduleList(params);

        if (!ignore) setPosts(data.content);
      } catch {
        if (!ignore) {
          setPosts([]);
          setError("로그인 후 확인해보세요.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPosts();

    return () => {
      ignore = true;
    };
  }, [activeTab, keyword, sortOrder, page]);

  return { posts, loading, error };
}
