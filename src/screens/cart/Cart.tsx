
import CartCount from "./CartCount";
import CartItem from "./CartItem";
import ScheduleButton from "./ScheduleButton";
import { useCartStore } from "../../store/cartStore";


export default function Cart() {
    const cartItems = useCartStore((state) => state.cartItems);

    return (
        <div className="flex flex-col min-h-full pb-6">
            <div className="flex-grow px-4 flex flex-col justify-between">
                <div>
                    <CartCount />


                    {cartItems.length === 0 ? (

                        <div className="text-gray-400 text-center py-12 text-sm">
                            장소를 추가하여 일정을 만들어 보세요.
                        </div>
                    ) : (

                        <div className="flex flex-col gap-3">
                            {cartItems.map((item) => (

                                <CartItem key={item.placeId} place={item} />
                            ))}
                        </div>
                    )}
                </div>

                <ScheduleButton />
            </div>
        </div>
    );
}
