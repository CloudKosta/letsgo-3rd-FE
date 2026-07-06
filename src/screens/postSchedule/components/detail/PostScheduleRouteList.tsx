import type { RouteSchedule } from "../../../../types";
import "./css/PostScheduleRouteList.css";

interface PostScheduleRouteListProps {
  routes: RouteSchedule[];
}

function getVisitOrder(order: string) {
  const parsed = Number(order);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function PostScheduleRouteList({ routes }: PostScheduleRouteListProps) {
  const sortedRoutes = [...routes].sort((a, b) => getVisitOrder(a.visitOrder) - getVisitOrder(b.visitOrder));

  if (sortedRoutes.length === 0) {
    return (
      <div className="post-schedule-route-list-empty">표시할 일정이 없습니다.</div>
    );
  }

  return (
    <div className="post-schedule-route-list">
      {sortedRoutes.map((route, index) => (
        <div key={route.visitId} className="post-schedule-route-list-item">
          <span className="post-schedule-route-list-order">
            {route.visitOrder || index + 1}
          </span>
          <span className="post-schedule-route-list-title">
            {route.title}
          </span>
        </div>
      ))}
    </div>
  );
}
