import { useEffect, useState } from 'react';
import { UserPlus, Send } from 'lucide-react';
import type { Colleague } from '../../../../types';
import { publishToSharedBoard } from '../../../../api/shareApi';
import { getCompanions } from '../../../../api/myScheduleApi';
import styles from './css/ShareTab.module.css';

interface ShareTabProps {
    myScheduleId: number;
}

const permissionLabel: Record<string, string> = {
    OWNER: '방장',
    EDITOR: '편집 가능',
    VIEWER: '보기 가능',
};

function ShareTab({ myScheduleId }: ShareTabProps) {
    const [companions, setCompanions] = useState<Colleague[]>([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        let ignore = false;
        getCompanions(myScheduleId)
            .then((data) => {
                if (!ignore) setCompanions(data);
            })
            .catch(() => {
                if (!ignore) setCompanions([]);
            });
        return () => {
            ignore = true;
        };
    }, [myScheduleId]);

    const handlePublish = async () => {
        setPublishing(true);
        try {
            await publishToSharedBoard({ myScheduleId, isAnonymous });
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>동반자</h3>
                    <button className={styles.addBtn}>
                        <UserPlus className={styles.addIcon} />
                        추가
                    </button>
                </div>

                {companions.length === 0 ? (
                    <p className={styles.empty}>아직 동반자가 없습니다.</p>
                ) : (
                    <ul className={styles.companionList}>
                        {companions.map((c) => (
                            <li key={c.userId} className={styles.companion}>
                                <span className={styles.avatar}>{c.name.charAt(0)}</span>
                                <span className={styles.name}>{c.name}</span>
                                <span className={styles.permission}>
                                    {permissionLabel[c.permission] ?? c.permission}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.card}>
                <h3 className={styles.cardTitle}>공개게시판에 게시</h3>

                <label className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className={styles.checkbox}
                    />
                    익명으로 게시
                </label>

                <button
                    className={styles.publishBtn}
                    onClick={handlePublish}
                    disabled={publishing}
                >
                    <Send className={styles.publishIcon} />
                    {publishing ? '게시 중...' : '게시하기'}
                </button>
            </section>
        </div>
    );
}

export default ShareTab;
