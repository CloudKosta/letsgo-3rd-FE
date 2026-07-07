import { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
// import PostScheduleBudget from "./components/detail/PostScheduleBudget";
// import PostScheduleDetailTab from "./components/detail/PostScheduleDetailTab";
// import type { PostScheduleDetailTabType } from "./components/detail/PostScheduleDetailTab";
import PostScheduleSchedulePanel from "./components/detail/PostScheduleSchedulePanel";
// import PostScheduleTodo from "./components/detail/PostScheduleTodo";
import {
  copyPostScheduleToMySchedule,
  deletePostSchedule,
  reportPostSchedule,
} from "../../api/postScheduleApi";
import { toast } from "../../store/toastStore";
import { usePostScheduleDetail } from "./hooks/usePostScheduleDetail";
import "./PostScheduleDetailApp.css";

export default function PostScheduleDetailApp() {
  const { id } = useParams();
  const { detail, loading, error } = usePostScheduleDetail(id);
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState<PostScheduleDetailTabType>("schedule");
  const [actionLoading, setActionLoading] = useState<"report" | "copy" | "delete" | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const openReportModal = () => {
    if (!detail || actionLoading) return;
    setReportReason("");
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    if (actionLoading) return;
    setIsReportModalOpen(false);
    setReportReason("");
  };

  const handleReportSubmit = async () => {
    if (!detail || actionLoading) return;

    const trimmedReason = reportReason.trim();
    if (!trimmedReason) {
      toast.error("신고 사유를 입력해주세요.");
      return;
    }

    setActionLoading("report");
    try {
      await reportPostSchedule(detail.postId, trimmedReason);
      toast.success("신고가 접수되었습니다.");
      setIsReportModalOpen(false);
      setReportReason("");
    } catch {
      toast.error("신고 처리에 실패했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCopy = async () => {
    if (!detail || actionLoading) return;

    setActionLoading("copy");
    try {
      await copyPostScheduleToMySchedule(detail.postId);
      toast.success("내 일정에 추가되었습니다.");
    } catch {
      toast.error("내 일정에 추가하지 못했습니다.");
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
      toast.success("게시물이 삭제되었습니다.");
      navigate("/postSchedule");
    } catch {
      toast.error("게시물을 삭제하지 못했습니다.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="post-schedule-detail-page">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
        <button
          type="button"
          className="post-schedule-detail-back-btn"
          onClick={() => navigate("/postSchedule")}
          aria-label="목록으로 돌아가기"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="post-schedule-detail-title">{detail?.scheduleTitle ?? ""}</h1>
        {detail?.owner && (
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
        {loading && <div className="post-schedule-detail-not-found">로딩중...</div>}

        {!loading && error && <div className="post-schedule-detail-not-found">{error}</div>}

        {!loading && !error && !detail && (
          <div className="post-schedule-detail-not-found">게시물을 찾을 수 없습니다.</div>
        )}

        {!loading && !error && detail && (
          <>
            <div className="post-schedule-detail-action-row">
              <button
                type="button"
                className="post-schedule-detail-action-btn post-schedule-detail-report-btn"
                onClick={openReportModal}
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

            <div className="post-schedule-detail-tab-content">
                <PostScheduleSchedulePanel maps={detail.maps} routes={detail.routes} />
            </div>
          </>
        )}
      </main>

      {isReportModalOpen && (
        <div
          className="post-schedule-report-modal-backdrop"
          onClick={closeReportModal}
        >
          <div
            className="post-schedule-report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-schedule-report-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="post-schedule-report-title"
              className="post-schedule-report-modal-title"
            >
              신고 사유
            </h2>
            <textarea
              className="post-schedule-report-modal-textarea"
              value={reportReason}
              onChange={(event) => setReportReason(event.target.value)}
              placeholder="신고 사유를 입력해주세요."
              rows={4}
              autoFocus
            />
            <div className="post-schedule-report-modal-actions">
              <button
                type="button"
                className="post-schedule-report-modal-cancel-btn"
                onClick={closeReportModal}
                disabled={actionLoading !== null}
              >
                취소
              </button>
              <button
                type="button"
                className="post-schedule-report-modal-submit-btn"
                onClick={handleReportSubmit}
                disabled={actionLoading !== null}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
