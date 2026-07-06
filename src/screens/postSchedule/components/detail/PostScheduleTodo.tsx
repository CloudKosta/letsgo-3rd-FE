import "./css/PostScheduleReadonlyPanel.css";

interface PostScheduleTodoProps {
  todoDetail?: string | null;
}

export default function PostScheduleTodo({ todoDetail }: PostScheduleTodoProps) {
  const content = todoDetail ?? "";

  if (!content.trim()) {
    return (
      <div className="post-schedule-readonly-empty">TO-DO가 없습니다.</div>
    );
  }

  return (
    <section className="post-schedule-readonly-panel">
      <div
        className="post-schedule-readonly-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
