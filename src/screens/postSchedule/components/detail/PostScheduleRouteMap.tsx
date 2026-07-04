import type { MapSchedule } from '../../../../types';
import './PostScheduleRouteMap.css';

interface PostScheduleRouteMapProps {
    maps: MapSchedule[];
}

interface MapPoint {
    x: number;
    y: number;
}

const fallbackPositions: MapPoint[] = [
    { x: 22, y: 28 },
    { x: 70, y: 42 },
    { x: 40, y: 72 },
    { x: 82, y: 78 },
    { x: 15, y: 60 },
    { x: 58, y: 20 },
];

const mapPadding = 12;

function toNumber(value: string) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function getVisitOrder(order: string) {
    const parsed = Number(order);
    return Number.isFinite(parsed) ? parsed : 0;
}

function createMapPoints(maps: MapSchedule[]): MapPoint[] {
    const coordinates = maps.map((map) => ({
        x: toNumber(map.mapX),
        y: toNumber(map.mapY),
    }));

    const hasValidCoordinates = coordinates.every((point) => point.x !== null && point.y !== null);

    if (!hasValidCoordinates) {
        return maps.map((_, index) => fallbackPositions[index % fallbackPositions.length]);
    }

    const xValues = coordinates.map((point) => point.x as number);
    const yValues = coordinates.map((point) => point.y as number);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const width = maxX - minX;
    const height = maxY - minY;

    if (width === 0 || height === 0) {
        return maps.map((_, index) => fallbackPositions[index % fallbackPositions.length]);
    }

    return coordinates.map((point) => ({
        x: mapPadding + (((point.x as number) - minX) / width) * (100 - mapPadding * 2),
        y: mapPadding + ((maxY - (point.y as number)) / height) * (100 - mapPadding * 2),
    }));
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

            {points.slice(0, -1).map((point, index) => {
                const nextPoint = points[index + 1];
                const distance = sortedMaps[index].distanceToNext;

                if (!distance) return null;

                return (
                    <div
                        key={`post-route-distance-${sortedMaps[index].visitOrder}`}
                        className="post-schedule-route-map-distance"
                        style={{
                            left: `${(point.x + nextPoint.x) / 2}%`,
                            top: `${(point.y + nextPoint.y) / 2}%`,
                        }}
                    >
                        {distance}km
                    </div>
                );
            })}
        </div>
    );
}

export default PostScheduleRouteMap;
