import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { createSchedule, addVisitItem } from '../../api/myScheduleApi';
import { toast } from '../../store/toastStore';
import './ScheduleButton.css';

export default function ScheduleButton() {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { cartItems, clearCart } = useCartStore();

    const handleCreateSchedule = async () => {
        if (!isLoggedIn) {
            toast.error('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('장바구니에 담긴 장소가 없습니다.');
            return;
        }

        const title = '여행가기';
        const trimmedTitle = title.trim();

        try {
            const uniqueId = `SCH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            await createSchedule(uniqueId, trimmedTitle);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await addVisitItem(uniqueId, item.placeId, i + 1);
            }

            // 3. Clear the cart
            clearCart();

            toast.success(`"${trimmedTitle}" 일정이 생성되었습니다.`);
            navigate('/mySchedule');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : '일정 생성 중 오류가 발생했습니다.');
        }
    };

    return (
        <button className="schedule-button" onClick={handleCreateSchedule}>
            이 장소들로 일정 만들기
        </button>
    );
}

