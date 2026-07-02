import { X } from "lucide-react";
import './CartItem.css';

export default function CartItem() {
    return (
        <div className="cart-item-container">
            <div className="cart-item-image-wrapper">
                <img
                    src="/bbangee.jpeg"
                    alt="빵빵이"
                    className="cart-item-image"
                />
            </div>

            <div className="cart-item-info-container">
                <div>
                    <h4 className="cart-item-title">
                        랜더스 필드
                    </h4>
                    <div className="cart-item-category">
                        레저스포츠
                    </div>
                </div>

                <button className="cart-item-remove-button">
                    <X />
                </button>
            </div>
        </div >
    );
}
