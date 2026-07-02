import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Navbar from './NavBar';
import MyScheduleLayout from '../../screens/mySchedule/MyScheduleLayout';
import Place from '../../screens/place/Place';
import Cart from '../../screens/cart/Cart';
import ChatBot from '../../screens/chatBot/ChatBot';

function PhoneLayoutContent() {

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <main className="flex-1 overflow-y-auto mt-16 mb-16 bg-gray-50">
                <Routes>
                    <Route path="/" element={<Place />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/mySchedule/*" element={<MyScheduleLayout />} />
                    <Route path="/chat" element={<ChatBot />} />
                </Routes>
            </main>

            <Navbar />
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
