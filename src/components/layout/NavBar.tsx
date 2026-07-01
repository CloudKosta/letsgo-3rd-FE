import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Calendar, ClipboardList, MessageCircle } from 'lucide-react';

const navItems = [
    { path: '/', label: '홈', Icon: Home },
    { path: '/cart', label: '카트', Icon: ShoppingCart },
    { path: '/mySchedule', label: '내일정', Icon: Calendar },
    { path: '/postSchedule', label: '일정게시판', Icon: ClipboardList },
    { path: '/chat', label: '챗봇', Icon: MessageCircle },
];

function Navbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white border-t border-gray-200">
            {navItems.map(({ path, label, Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-1 text-xs ${isActive ? 'text-black' : 'text-gray-400'
                        }`
                    }
                >
                    <Icon className="w-6 h-6" />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

export default Navbar;