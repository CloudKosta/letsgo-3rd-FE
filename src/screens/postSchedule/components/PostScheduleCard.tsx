import { Eye, Heart, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PostSchedule } from "../../../types";
import "./PostScheduleCard.css";

interface PostScheduleCardProps {
    post: PostSchedule;
}

function PostScheduleCard({ post }: PostScheduleCardProps) {
    const navigate = useNavigate();
    const authorName = post.isAnonymous === 1 ? "익명" : post.userName;
    const shortAddress = post.addr1.length > 10 ? post.addr1.slice(0, 10) : post.addr1;

    return (
        <article
            className="post-card"
            onClick={() => navigate(`/postSchedule/${post.postId}`)}
        >
            <div className="post-card-header">
                <div className="post-card-title-group">
                    <h3 className="post-card-title">{post.title}</h3>
                    <p className="post-card-subtitle">{post.placeTitle}</p>
                </div>
            </div>

            {post.firstImage && (
                <img
                    className="post-card-image"
                    src={post.firstImage}
                    alt={post.placeTitle}
                />
            )}

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
                        {post.likeCount}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default PostScheduleCard;
