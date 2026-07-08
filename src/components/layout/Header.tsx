import type { HeaderButtonProp } from './HeaderButton';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import HeaderButton from './HeaderButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

function maskName(name: string): string {
    if (!name) return "";
    if (name.length <= 1) return name;
    return name[0] + '*'.repeat(name.length - 1);
}

function Header() {
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

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
                <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
                    <img
                        src="/letsgo-logo-v5.png"
                        alt="LetsGO"
                        className="h-[40px] w-auto object-contain"
                    />
                </a>
            </div>

            <div className="flex items-center gap-2">
                {isLoggedIn && user && (
                    <span className="text-sm font-medium text-gray-700">{maskName(user.name)}님</span>
                )}
                {!isLoggedIn && (
                    <span
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                        onClick={() => navigate('/user/login')}
                    >
                        로그인
                    </span>
                )}
                {headerItems
                    .filter((item) => {
                        if (item.label === 'login') return (!isLoggedIn);
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