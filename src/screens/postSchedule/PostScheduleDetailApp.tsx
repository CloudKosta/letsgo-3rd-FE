import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PostScheduleBudget from "./components/detail/PostScheduleBudget";
import PostScheduleDetailTab from "./components/detail/PostScheduleDetailTab";
import type { PostScheduleDetailTabType } from "./components/detail/PostScheduleDetailTab";
import PostScheduleSchedulePanel from "./components/detail/PostScheduleSchedulePanel";
import PostScheduleTodo from "./components/detail/PostScheduleTodo";
import { usePostScheduleDetail } from "./hooks/usePostScheduleDetail";
import "./PostScheduleDetailApp.css";

export default function PostScheduleDetailApp() {
  const { id } = useParams();
  const { detail, loading, error } = usePostScheduleDetail(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PostScheduleDetailTabType>("schedule");

  if (loading) {
    return <div className="post-schedule-detail-not-found">로딩중...</div>;
  }

  if (error) {
    return <div className="post-schedule-detail-not-found">{error}</div>;
  }

  if (!detail) {
    return <div className="post-schedule-detail-not-found">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-schedule-detail-page">
      <header className="post-schedule-detail-header">
        <button
          type="button"
          className="post-schedule-detail-back-btn"
          onClick={() => navigate("/postSchedule")}
          aria-label="목록으로 돌아가기"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="post-schedule-detail-title">{detail.scheduleTitle}</h1>
      </header>

      <main className="post-schedule-detail-content">
        <PostScheduleDetailTab activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="post-schedule-detail-tab-content">
          {activeTab === "schedule" && (
            <PostScheduleSchedulePanel maps={detail.maps} routes={detail.routes} />
          )}

          {activeTab === "budget" && (
            <PostScheduleBudget budgetDetail={detail.budgetDetail} />
          )}

          {activeTab === "todo" && (
            <PostScheduleTodo todoDetail={detail.todoDetail} />
          )}
        </div>
      </main>
    </div>
  );
}
