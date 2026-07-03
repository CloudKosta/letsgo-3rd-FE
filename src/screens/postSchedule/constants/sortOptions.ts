export const sortOptions = ["최신순", "좋아요순", "조회순", "제목순"] as const;

export type SortType = (typeof sortOptions)[number];
