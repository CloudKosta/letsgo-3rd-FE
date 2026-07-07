import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { toast } from '../../store/toastStore';
import Header from './Header';
import Navbar from './NavBar';
import MyScheduleLayout from '../../screens/mySchedule/MyScheduleLayout';
import PostScheduleLayout from '../../screens/postSchedule/PostScheduleLayout';
import Place from '../../screens/place/Place';
import Cart from '../../screens/cart/Cart';
import ChatBot from '../../screens/chatBot/ChatBot';
import UserApp from '../../screens/User/UserApp';
import OAuthCallback from '../../screens/User/OAuthCallback';
import Toaster from '../shared/Toaster';

function PhoneLayoutContent() {
    const location = useLocation();
    const isUserPage = location.pathname.startsWith('/user');

    useEffect(() => {
        if (sessionStorage.getItem('sessionExpired')) {
            sessionStorage.removeItem('sessionExpired');
            toast.error('세션이 만료되었습니다. 다시 로그인해 주세요.');
        }
    }, []);

    return (
        <div className="flex flex-col h-screen">
            {!isUserPage && <Header />}

            <main className={`flex-1 overflow-y-auto ${isUserPage ? 'flex flex-col mt-0 mb-0 bg-white' : 'mt-16 mb-16 bg-gray-50'}`}>
                <Routes>
                    <Route path="/" element={<Place />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/mySchedule/*" element={<MyScheduleLayout />} />
                    <Route path="/postSchedule/*" element={<PostScheduleLayout />} />
                    <Route path="/chat" element={<ChatBot />} />
                    <Route path="/user/*" element={<UserApp />} />
                    <Route path="/oauth/callback" element={<OAuthCallback />} />
                </Routes>
            </main>

            {!isUserPage && <Navbar />}
            <Toaster />
        </div>
    );
}

function PhoneLayout() {
    return (
        <BrowserRouter>
            <PhoneLayoutContent />
        </BrowserRouter>
    );
}

export default PhoneLayout;
