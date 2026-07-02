

// interface PostScheduleCardDatas {
//     scheduleTitle: string;
//     placeTitle: string;
//     addr1: string;
//     addr2: string;
//     viewCount: number;
//     likeCount: number;
//     name: string;
// }


export default function PostScheduleCard() {
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

            
            </div>
        </div >
    );
}