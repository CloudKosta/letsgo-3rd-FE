import { Heart, MapPin, SquarePlus } from "lucide-react";
import "./PlaceBox.css";

export default function PlaceBox() {
    return (
        <div className="place-box-container">

            <div className="place-box-image-wrapper">
                <img
                    src="/bbangee.jpeg"
                    alt="빵빵이"
                    className="place-box-image"
                />

                <button className="place-box-like-button">
                    <Heart className="place-box-like-icon" />
                </button>
            </div>

            <div className="place-box-content">
                <div className="place-box-meta">
                    <MapPin className="place-box-meta-icon" />
                    빵빵이
                </div>

                <h3 className="place-box-title">
                    빵빵아 옥찌얌!
                </h3>

                <button className="place-box-add-button">
                    <SquarePlus className="place-box-add-icon" />
                    담기
                </button>
            </div>
        </div>
    );
}

