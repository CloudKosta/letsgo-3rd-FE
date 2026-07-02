import { useEffect, type RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement | null>, onOutside: () => void) {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (e.target instanceof Node && !ref.current?.contains(e.target)) {
                onOutside();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref, onOutside]);
}
