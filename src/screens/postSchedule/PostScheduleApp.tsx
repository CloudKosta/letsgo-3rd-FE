import { useState } from "react";
import "./PostScheduleApp.css";
import PostScheduleCard from "./components/PostScheduleCard";
import { TabButton, type PostTabType } from "./components/TabButton";
import SearchBox from "./components/SearchBox";
import DropDown from "./components/DropDown";
import { sortOptions, type SortType } from "./constants/sortOptions";
import { usePostScheduleList } from "./hooks/usePostScheduleList";

export default function PostScheduleApp() {
  const [activeTab, setActiveTab] = useState<PostTabType>("all");
  const [activeSort, setActiveSort] = useState<SortType>(sortOptions[0]);
  const [keyword, setKeyword] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { posts, loading, error } = usePostScheduleList({
    activeTab,
    keyword: submittedQuery,
    sortOrder: activeSort,
  });

  return (
    <div className="post-schedule-page">
      <div className="post-schedule-title-bar post-schedule-title">
        
      </div>

      <TabButton activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="post-schedule-filter-row">
        <div className="post-schedule-search-cell">
          <SearchBox
            value={keyword}
            onChange={setKeyword}
            onSearch={setSubmittedQuery}
          />
        </div>

        <DropDown activeSort={activeSort} onSortChange={setActiveSort} />
      </div>

      {loading && (
        <div className="post-schedule-empty-state">
          <p className="post-schedule-empty-text">로딩중...</p>
        </div>
      )}

      {error && (
        <div className="post-schedule-empty-state">
          <p className="post-schedule-empty-text">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="post-schedule-list">
          {posts.map((post) => (
            <PostScheduleCard key={post.postId} post={post} />
          ))}

          {posts.length === 0 && (
            <div className="post-schedule-empty-state">
              <p className="post-schedule-empty-text">게시물이 없습니다</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
