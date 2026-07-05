export const sortOptions = ["최신순", "좋아요순", "조회순", "제목순"] as const;

export type SortType = (typeof sortOptions)[number];

export type PostScheduleSortOrder = "latest" | "like" | "view" | "title";

const sortOrderMap: Record<SortType, PostScheduleSortOrder> = {
  최신순: "latest",
  좋아요순: "like",
  조회순: "view",
  제목순: "title",
};

export function getPostScheduleSortOrder(sortType: SortType): PostScheduleSortOrder {
  return sortOrderMap[sortType];
}
