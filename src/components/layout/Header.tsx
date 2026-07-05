import type { HeaderButtonProp } from './HeaderButton';
import { LogInIcon, LogOutIcon, ChevronLeft } from 'lucide-react';
import HeaderButton from './HeaderButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

function Header() {
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();
    const location = useLocation();

    const isUserPage = location.pathname.startsWith('/user');

    const handleLogout = () => {
        logout();
        navigate('/user/login');
    };

    const headerItems: HeaderButtonProp[] = [
        { label: 'login', Icon: LogInIcon, onClick: () => navigate('/user/login') },
        { label: 'logout', Icon: LogOutIcon, onClick: handleLogout }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
            <div className="flex items-center gap-2">
                <a href="/" className="font-bold text-xl tracking-tight text-blue-600">
                    LetsGo
                </a>
                {isUserPage && (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-1"
                        aria-label="뒤로가기"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                {isLoggedIn && user && (
                    <span className="text-sm font-medium text-gray-700">{user.name}님</span>
                )}
                {!isLoggedIn && (
                    <span className="text-sm font-medium text-gray-700">로그인</span>
                )}
                {headerItems
                    .filter((item) => {
                        if (item.label === 'login') return !isLoggedIn;
                        if (item.label === 'logout') return isLoggedIn;
                        return true;
                    })
                    .map((item) => (
                        <HeaderButton key={item.label} {...item} />
                    ))}
            </div>
        </header>
    );
}

export default Header;