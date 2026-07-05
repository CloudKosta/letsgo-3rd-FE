import type { MapSchedule, RouteSchedule } from "../../../../types";
import PostScheduleRouteMap from "./PostScheduleRouteMap";
import PostScheduleRouteList from "./PostScheduleRouteList";

interface PostScheduleSchedulePanelProps {
  maps: MapSchedule[];
  routes: RouteSchedule[];
}

export default function PostScheduleSchedulePanel({ maps, routes }: PostScheduleSchedulePanelProps) {
  return (
    <section className="post-schedule-detail-section">
      <PostScheduleRouteMap maps={maps} />
      <PostScheduleRouteList routes={routes} />
    </section>
  );
}
