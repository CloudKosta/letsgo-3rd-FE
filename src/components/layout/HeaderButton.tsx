import type { LucideIcon } from "lucide-react";


export interface HeaderButtonProp {
    label: string;
    Icon: LucideIcon;
    onClick?: () => void;
}


function HeaderButton({ label, Icon, onClick }: HeaderButtonProp) {
    return (
        <button aria-label={label} onClick={onClick}>
            <Icon size={20} />
        </button>
    )
}

export default HeaderButton