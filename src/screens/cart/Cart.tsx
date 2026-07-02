import CartHeader from "./CartHeader";
import CartCount from "./CartCount";
import CartItem from "./CartItem";
import ScheduleButton from "./ScheduleButton";

export default function Cart() {
    return (
        <div className="flex flex-col min-h-full pb-6">
            <CartHeader />
            <div className="flex-grow px-4 flex flex-col justify-between">
                <div>
                    <CartCount />
                    <CartItem />
                </div>
                <ScheduleButton />
            </div>
        </div>
    );
}
