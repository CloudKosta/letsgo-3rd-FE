import { Calendar, Eye, Heart, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PostSchedule } from "../../../types";
import "./PostScheduleCard.css";

interface PostScheduleCardProps {
    post: PostSchedule;
}

function PostScheduleCard({ post }: PostScheduleCardProps) {
    const navigate = useNavigate();
    const authorName = post.anonymous ? "익명" : post.author;

    return (
        <article
            className="post-card"
            onClick={() => navigate(`/postSchedule/${post.postId}`)}
        >
            <div className="post-card-header">
                <div className="post-card-title-group">
                    <h3 className="post-card-title">{post.postTitle}</h3>
                    <p className="post-card-subtitle">{post.scheduleTitle}</p>
                </div>
                {post.isMine && <span className="post-card-mine-badge">내 게시물</span>}
            </div>

            <div className="post-card-meta">
                <span className="post-card-meta-item">
                    <User className="post-card-meta-icon" />
                    {authorName}
                </span>
                <span className="post-card-meta-item">
                    <Calendar className="post-card-meta-icon" />
                    {post.startAt}
                </span>
                <span className="post-card-meta-item">
                    <MapPin className="post-card-meta-icon" />
                    {post.placeCount}곳
                </span>
            </div>

            <div className="post-card-tag-list">
                {post.placeTitles.map((placeTitle) => (
                    <span key={placeTitle} className="post-card-tag">
                        {placeTitle}
                    </span>
                ))}
            </div>

            <div className="post-card-footer">
                <span>{post.createdAt}</span>
                <div className="post-card-stats">
                    <span className="post-card-stat">
                        <Eye className="post-card-stat-icon" />
                        {post.viewCount}
                    </span>
                    <span className="post-card-stat">
                        <Heart className="post-card-stat-icon" />
                        {post.likeCount}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default PostScheduleCard;
