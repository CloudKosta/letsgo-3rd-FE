import { useState, type MouseEvent } from "react";
import { Eye, Heart, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { plusPostScheduleLike } from "../../../api/postScheduleApi";
import type { PostSchedule } from "../../../types";
import "./css/PostScheduleCard.css";

interface PostScheduleCardProps {
    post: PostSchedule;
}

function PostScheduleCard({ post }: PostScheduleCardProps) {
    const navigate = useNavigate();
    const [likeState, setLikeState] = useState({ postId: post.postId, count: post.likeCount });
    const [isLiking, setIsLiking] = useState(false);
    const likeCount = likeState.postId === post.postId ? likeState.count : post.likeCount;
    const authorName = post.isAnonymous === 1 ? "익명" : post.userName;
    const shortAddress = post.addr1.length > 10 ? post.addr1.slice(0, 10) : post.addr1;

    const handleLike = async (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (isLiking) return;

        setIsLiking(true);
        try {
            const nextLikeCount = await plusPostScheduleLike(post.postId);
            setLikeState({ postId: post.postId, count: nextLikeCount });
        } catch {
            alert("좋아요 처리에 실패했습니다.");
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <article
            className="post-card"
            onClick={() => navigate(`/postSchedule/${post.postId}`)}
        >
            <div className="post-card-header">
                <div className="post-card-title-group">
                    <h3 className="post-card-title">{post.title}</h3>
                </div>
                <button
                    type="button"
                    className="post-card-like-btn"
                    onClick={handleLike}
                    disabled={isLiking}
                    aria-label="좋아요"
                >
                    <Heart className="post-card-like-icon" />
                </button>
            </div>

            <div className="post-card-meta">
                <span className="post-card-meta-item">
                    <User className="post-card-meta-icon" />
                    {authorName}
                </span>
                <span className="post-card-meta-item">
                    <MapPin className="post-card-meta-icon" />
                    {shortAddress}
                </span>
            </div>

            <div className="post-card-footer">
                <span>{post.placeTitle}</span>
                <div className="post-card-stats">
                    <span className="post-card-stat">
                        <Eye className="post-card-stat-icon" />
                        {post.viewCount}
                    </span>
                    <span className="post-card-stat">
                        <Heart className="post-card-stat-icon" />
                        {likeCount}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default PostScheduleCard;
