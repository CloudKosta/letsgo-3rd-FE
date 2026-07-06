import type { MapSchedule } from '../../../../types';
import './css/PostScheduleRouteMap.css';

interface PostScheduleRouteMapProps {
    maps: MapSchedule[];
}

interface MapPoint {
    x: number;
    y: number;
}

const positions: MapPoint[] = [
    { x: 22, y: 28 },
    { x: 70, y: 42 },
    { x: 40, y: 72 },
    { x: 82, y: 78 },
    { x: 15, y: 60 },
    { x: 58, y: 20 },
];

function getVisitOrder(order: string) {
    const parsed = Number(order);
    return Number.isFinite(parsed) ? parsed : 0;
}

function createMapPoints(maps: MapSchedule[]): MapPoint[] {
    return maps.map((_, index) => positions[index % positions.length]);
}

function PostScheduleRouteMap({ maps }: PostScheduleRouteMapProps) {
    if (maps.length === 0) {
        return (
            <div className="post-schedule-route-map-empty">지도에 표시할 장소가 없습니다.</div>
        );
    }

    const sortedMaps = [...maps].sort((a, b) => getVisitOrder(a.visitOrder) - getVisitOrder(b.visitOrder));
    const points = createMapPoints(sortedMaps);

    return (
        <div className="post-schedule-route-map" aria-label="일정 경로 지도">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="post-schedule-route-map-svg">
                {points.slice(0, -1).map((point, index) => {
                    const nextPoint = points[index + 1];

                    return (
                        <line
                            key={`post-route-line-${sortedMaps[index].visitOrder}`}
                            x1={point.x}
                            y1={point.y}
                            x2={nextPoint.x}
                            y2={nextPoint.y}
                            className="post-schedule-route-map-line"
                        />
                    );
                })}
            </svg>

            {points.map((point, index) => {
                const map = sortedMaps[index];

                return (
                    <div
                        key={`post-route-marker-${map.visitOrder}`}
                        className="post-schedule-route-map-marker"
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        title={map.title}
                    >
                        {map.visitOrder}
                    </div>
                );
            })}

        </div>
    );
}

export default PostScheduleRouteMap;
