import { GripVertical, Plus } from 'lucide-react';
import type { RouteSchedule } from '../../../../types';
import styles from './css/PlaceList.module.css';

interface PlaceListProps {
    places: RouteSchedule[];
    onAddClick?: () => void;
}

function PlaceList({ places, onAddClick }: PlaceListProps) {
    return (
        <div className={styles.list}>
            {places.map((place, i) => (
                <div key={place.visitId} className={styles.item}>
                    <span className={styles.order}>{i + 1}</span>
                    <span className={styles.title}>{place.title}</span>
                    {place.distanceToNext > 0 && (
                        <span className={styles.distance}>{place.distanceToNext}km</span>
                    )}
                    <button className={styles.handle} aria-label="순서 변경">
                        <GripVertical className={styles.handleIcon} />
                    </button>
                </div>
            ))}

            {onAddClick && (
                <button className={styles.addBtn} onClick={onAddClick}>
                    <Plus className={styles.addIcon} />
                    장소 추가
                </button>
            )}
        </div>
    );
}

export default PlaceList;
