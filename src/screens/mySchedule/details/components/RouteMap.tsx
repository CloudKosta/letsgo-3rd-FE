import type { RouteSchedule } from '../../../../types';
import styles from './css/RouteMap.module.css';

interface RouteMapProps {
    places: RouteSchedule[];
}

const positions = [
    { x: 22, y: 28 },
    { x: 70, y: 42 },
    { x: 40, y: 72 },
    { x: 82, y: 78 },
    { x: 15, y: 60 },
    { x: 58, y: 20 },
];

function RouteMap({ places }: RouteMapProps) {
    if (places.length === 0) {
        return (
            <div className={styles.empty}>지도에 표시할 장소가 없습니다.</div>
        );
    }

    const points = places.map((_, i) => positions[i % positions.length]);

    return (
        <div className={styles.map}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.svg}>
                {points.slice(0, -1).map((p, i) => {
                    const next = points[i + 1];
                    return (
                        <line
                            key={`line-${i}`}
                            x1={p.x}
                            y1={p.y}
                            x2={next.x}
                            y2={next.y}
                            className={styles.route}
                        />
                    );
                })}
            </svg>

            {points.map((p, i) => (
                <div
                    key={`marker-${i}`}
                    className={styles.marker}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                    {i + 1}
                </div>
            ))}

            {points.slice(0, -1).map((p, i) => {
                const next = points[i + 1];
                const distance = places[i].distanceToNext;
                if (!distance) return null;
                return (
                    <div
                        key={`dist-${i}`}
                        className={styles.distance}
                        style={{
                            left: `${(p.x + next.x) / 2}%`,
                            top: `${(p.y + next.y) / 2}%`,
                        }}
                    >
                        {distance}km
                    </div>
                );
            })}
        </div>
    );
}

export default RouteMap;
