import { useState } from "react";
import { User } from 'lucide-react';
import "./PostScheduleApp.css";
import PostScheduleCard from "./components/PostScheduleCard";
import {TabButton, type PostTabType} from "./components/TabButton";
import SearchBox from "./components/SearchBox";
import DropDown from "./components/DropDown";
import { sortOptions, type SortType } from "./constants/sortOptions";
import { mockPostSchedules } from "../../data/mockPostSchedules";

export default function PostScheduleApp() {
  const [activeTab, setActiveTab] = useState<PostTabType>("all");
  const [activeSort, setActiveSort] = useState<SortType>(sortOptions[0]);
  const [keyword, setKeyword] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const query = submittedQuery.trim().toLowerCase();
  const filteredPosts = mockPostSchedules.filter((post) => {
    if (activeTab === "mine" && !post.isMine) return false;
    if (!query) return true;

    return [
      post.postTitle,
      post.scheduleTitle,
      post.anonymous ? "" : post.author,
      ...post.placeTitles,
    ].some((value) => value.toLowerCase().includes(query));
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeSort === "좋아요순") return b.likeCount - a.likeCount;
    if (activeSort === "조회순") return b.viewCount - a.viewCount;
    if (activeSort === "제목순") return a.postTitle.localeCompare(b.postTitle);
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div className="post-schedule-page">
      <div className="post-schedule-title-bar">
          <h1 className="post-schedule-title">일정게시판</h1>
          <button className="post-schedule-profile-btn" aria-label="프로필">
              <User className="post-schedule-profile-icon" />
          </button>
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

      <div className="post-schedule-list">
        {sortedPosts.map((post) => (
          <PostScheduleCard key={post.postId} post={post} />
        ))}

        {sortedPosts.length === 0 && (
          <div className="post-schedule-empty-state">
            <p className="post-schedule-empty-text">게시물이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
