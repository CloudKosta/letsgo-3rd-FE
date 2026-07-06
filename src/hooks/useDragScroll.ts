import { useRef, type MouseEvent } from "react";

export function useDragScroll() {
    const ref = useRef<HTMLDivElement>(null);

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        const ele = ref.current;
        if (!ele) return;

        const startX = e.pageX - ele.offsetLeft;
        const scrollLeft = ele.scrollLeft;

        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
            const x = moveEvent.pageX - ele.offsetLeft;
            const walk = (x - startX) * 1.5;
            ele.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return {
        ref,
        onMouseDown,
        style: { cursor: 'grab' }
    };
}
