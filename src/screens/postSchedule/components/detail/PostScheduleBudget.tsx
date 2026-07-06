import "./css/PostScheduleReadonlyPanel.css";

interface PostScheduleBudgetProps {
  budgetDetail?: string | null;
}

export default function PostScheduleBudget({ budgetDetail }: PostScheduleBudgetProps) {
  const content = budgetDetail ?? "";

  if (!content.trim()) {
    return (
      <div className="post-schedule-readonly-empty">예산 내역이 없습니다.</div>
    );
  }

  return (
    <section className="post-schedule-readonly-panel">
      <div className="post-schedule-readonly-content">
        {content}
      </div>
    </section>
  );
}
