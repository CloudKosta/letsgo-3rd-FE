import type { LucideIcon } from "lucide-react";


export interface HeaderButtonProp {
    label: string;
    Icon: LucideIcon;
}


function HeaderButton({ label, Icon }: HeaderButtonProp) {
    return (
        <button aria-label={label}>
            <Icon size={20} />
        </button>
    )
}

export default HeaderButton