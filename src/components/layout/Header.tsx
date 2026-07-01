import { useState } from 'react';
import type { HeaderButtonProp } from './HeaderButton';
import { LogInIcon, LogOutIcon, SearchIcon } from 'lucide-react';
import HeaderButton from './HeaderButton';

const headerItems: HeaderButtonProp[] = [
    { label: 'search', Icon: SearchIcon },
    { label: 'login', Icon: LogInIcon },
    { label: 'logout', Icon: LogOutIcon }
];

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
            <a href="/" className="font-bold text-xl tracking-tight text-blue-600">
                LetsGo
            </a>

            <div className="flex items-center gap-2">
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