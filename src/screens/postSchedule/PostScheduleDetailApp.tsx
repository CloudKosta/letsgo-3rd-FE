import { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PostScheduleBudget from "./components/detail/PostScheduleBudget";
import PostScheduleDetailTab from "./components/detail/PostScheduleDetailTab";
import type { PostScheduleDetailTabType } from "./components/detail/PostScheduleDetailTab";
import PostScheduleSchedulePanel from "./components/detail/PostScheduleSchedulePanel";
import PostScheduleTodo from "./components/detail/PostScheduleTodo";
import {
  copyPostScheduleToMySchedule,
  deletePostSchedule,
  reportPostSchedule,
} from "../../api/postScheduleApi";
import { usePostScheduleDetail } from "./hooks/usePostScheduleDetail";
import "./PostScheduleDetailApp.css";

export default function PostScheduleDetailApp() {
  const { id } = useParams();
  const { detail, loading, error } = usePostScheduleDetail(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PostScheduleDetailTabType>("schedule");
  const [actionLoading, setActionLoading] = useState<"report" | "copy" | "delete" | null>(null);

  const handleReport = async () => {
    if (!detail || actionLoading) return;

    const reason = window.prompt("신고 사유를 입력해주세요.");
    if (!reason?.trim()) return;

    setActionLoading("report");
    try {
      await reportPostSchedule(detail.postId, reason.trim());
      alert("신고가 접수되었습니다.");
    } catch {
      alert("신고 처리에 실패했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCopy = async () => {
    if (!detail || actionLoading) return;

    setActionLoading("copy");
    try {
      await copyPostScheduleToMySchedule(detail.postId);
      alert("내 일정에 추가되었습니다.");
    } catch {
      alert("내 일정에 추가하지 못했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!detail || actionLoading) return;
    if (!window.confirm("게시물을 삭제할까요?")) return;

    setActionLoading("delete");
    try {
      await deletePostSchedule(detail.postId);
      alert("게시물이 삭제되었습니다.");
      navigate("/postSchedule");
    } catch {
      alert("게시물을 삭제하지 못했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

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
        {detail.owner && (
          <button
            type="button"
            className="post-schedule-detail-delete-btn"
            onClick={handleDelete}
            disabled={actionLoading !== null}
            aria-label="게시물 삭제"
          >
            <Trash2 size={18} />
          </button>
        )}
      </header>

      <main className="post-schedule-detail-content">
        <div className="post-schedule-detail-action-row">
          <button
            type="button"
            className="post-schedule-detail-action-btn post-schedule-detail-report-btn"
            onClick={handleReport}
            disabled={actionLoading !== null}
          >
            신고하기
          </button>
          <button
            type="button"
            className="post-schedule-detail-action-btn post-schedule-detail-copy-btn"
            onClick={handleCopy}
            disabled={actionLoading !== null}
          >
            내 일정에 추가
          </button>
        </div>

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
