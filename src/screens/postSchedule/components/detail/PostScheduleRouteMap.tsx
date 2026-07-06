import NaverRouteMap from "../../../../components/shared/NaverRouteMap";
import type { MapSchedule } from "../../../../types";

interface PostScheduleRouteMapProps {
  maps: MapSchedule[];
}

export default function PostScheduleRouteMap({ maps }: PostScheduleRouteMapProps) {
  return <NaverRouteMap maps={maps} />;
}
