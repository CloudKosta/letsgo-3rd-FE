import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, SquarePlus, ImageOff } from "lucide-react";
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";
import type { PlaceDTO } from "./interface";
import { api } from "../../api/axiosInstance";
import "./PlaceBox.css";

interface PlaceBoxProps {
    place: PlaceDTO;
}

export default function PlaceBox({ place }: PlaceBoxProps) {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const [imageError, setImageError] = useState(false);
    const [likeCount, setLikeCount] = useState(place.likeCount || 0);
    const addToCart = useCartStore((state) => state.addToCart);


    const handleLikeClick = async () => {
        if (!isLoggedIn) {
            toast.error("로그인이 필요한 서비스입니다.");
            navigate("/user/login");
            return;
        }
        try {
            const params = new URLSearchParams();
            params.append("placeId", place.placeId.toString());
            params.append("placeType", place.placeType.toString());

            const response = await api.post("/placeLikeAjax", params);
            if (response.data && response.data.result === "success") {
                setLikeCount(response.data.likeCount);
            }
        } catch (error) {
            console.error("좋아요 오류:", error);
        }
    }

    return (
        <div className="place-box-container">

            <div className="place-box-image-wrapper">
                {!imageError && place.firstImage ? (
                    <img
                        src={place.firstImage}
                        alt={place.title}
                        className="place-box-image"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="place-box-no-image">
                        <ImageOff className="w-8 h-8 text-gray-300 mb-1" />
                        <span>사진 없음</span>
                    </div>
                )}

                <button className="place-box-like-button" onClick={handleLikeClick}>
                    <Heart className="place-box-like-icon" />
                    <span className="text-gray-600 text-xs ml-1">{likeCount}</span>
                </button>
            </div>

            <div className="place-box-content">
                <div className="place-box-meta">
                    <MapPin className="place-box-meta-icon" />
                    <span className="truncate">{place.addr1 || "주소 없음"}</span>
                </div>

                <div className="place-box-title-wrapper">
                    <h3 className="place-box-title truncate" title={place.title}>
                        {place.title}
                    </h3>

                    <button
                        className="place-box-add-button"
                        onClick={() => {
                            addToCart(place);
                        }}
                    >
                        <SquarePlus className="place-box-add-icon" />
                        담기
                    </button>
                </div>

            </div>
        </div>
    );
}

