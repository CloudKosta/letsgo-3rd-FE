import { create } from "zustand";

export type ToastType = "success" | "error";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastState {
  // Single Toast system (for cartStore, etc.)
  isOpen: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;

  // Multi-Toast system (for MyScheduleDetail, ShareTab, etc.)
  toasts: Toast[];
  show: (type: ToastType, message: string) => void;
  dismiss: (id: number) => void;
}

let seq = 0;
const DURATION = 3000;

export const useToastStore = create<ToastState>((set, get) => {
  let singleTimeoutId: any = null;

  return {
    // Single Toast system implementation
    isOpen: false,
    message: "",
    showToast: (message) => {
      if (singleTimeoutId) clearTimeout(singleTimeoutId);
      set({ isOpen: true, message });
      singleTimeoutId = setTimeout(() => {
        get().hideToast();
      }, 2000);
    },
    hideToast: () => set({ isOpen: false, message: "" }),

    // Multi-Toast system implementation
    toasts: [],
    show: (type, message) => {
      const id = ++seq;
      set((s) => ({ toasts: [...s.toasts, { id, type, message }] }));
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, DURATION);
    },
    dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  };
});

/** 컴포넌트 밖(핸들러/서비스)에서도 호출할 수 있는 단축 API. */
export const toast = {
  success: (message: string) => useToastStore.getState().show("success", message),
  error: (message: string) => useToastStore.getState().show("error", message),
};
