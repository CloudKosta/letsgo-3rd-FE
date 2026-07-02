import './CartCount.css';

export default function CartCount() {
    return (
        <div className="cart-count-container">
            <div className="cart-count-info">
                <div>
                    <div className="cart-count-label">
                        장바구니에 담긴 활동 수
                    </div>
                </div>
                <div className="cart-count-value">
                    4개
                </div>
            </div>
        </div >
    );
}
