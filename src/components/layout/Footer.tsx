

function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2 mt-auto">
            <div className="flex items-center gap-1.5 opacity-80">
                <img
                    src="/letsgo-logo-v5.png"
                    alt="LetsGO"
                    className="h-5 w-auto object-contain filter grayscale"
                />
            </div>

            <div className="flex flex-col gap-1 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500">개발 팀</span>
                    <span className="text-gray-300">|</span>
                    <span>Team Cloud</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500">프로젝트</span>
                    <span className="text-gray-300">|</span>
                    <span>KOSTA 2026 Let's GO!</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500">팀원</span>
                    <span className="text-gray-300">|</span>
                    <span>한상민, 고문성, 강신회, 김세은</span>
                </div>

            </div>

            <div className="border-t border-gray-100/70 pt-2 mt-0.5 text-[10px] text-gray-300">
                © {new Date().getFullYear()} LetsGO. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
