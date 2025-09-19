import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface ToastOptions {
  title?: string;
  duration?: number;
  priority?: ToastPriority;
  persistent?: boolean; // Won't auto-dismiss if true
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  title?: string;
  duration: number;
  priority: ToastPriority;
  persistent: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  createdAt: number;
  timeoutId?: NodeJS.Timeout;
}

interface ToastState {
  toasts: Toast[];
  queue: Toast[];
  maxVisible: number;

  showToast: (message: string, variant: ToastVariant, options?: ToastOptions) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  clearQueue: () => void;
  processQueue: () => void;

  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
}

const PRIORITY_WEIGHTS: Record<ToastPriority, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

const DEFAULT_DURATIONS: Record<ToastVariant, number> = {
  success: 4000,
  info: 4000,
  warning: 6000,
  error: 8000,
};

export const useToastStore = create<ToastState>()(
  devtools(
    (set, get) => ({
      toasts: [],
      queue: [],
      maxVisible: 5,

      showToast: (message, variant, options = {}) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const priority = options.priority ?? 'normal';
        const duration = options.duration ?? DEFAULT_DURATIONS[variant];
        const persistent = options.persistent ?? false;

        const newToast: Toast = {
          id,
          message,
          variant,
          title: options.title,
          duration,
          priority,
          persistent,
          action: options.action,
          icon: options.icon,
          className: options.className,
          createdAt: Date.now(),
        };

        const state = get();

        if (state.toasts.length >= state.maxVisible) {
          set(currentState => ({
            queue: [...currentState.queue, newToast].sort((a, b) => {
              const priorityDiff = PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
              return priorityDiff !== 0 ? priorityDiff : a.createdAt - b.createdAt;
            })
          }), false, 'queueToast');
          return id;
        }

        const updatedToasts = [...state.toasts, newToast].sort((a, b) => {
          const priorityDiff = PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
          return priorityDiff !== 0 ? priorityDiff : a.createdAt - b.createdAt;
        });

        set({ toasts: updatedToasts }, false, 'showToast');

        if (!persistent && duration > 0) {
          const timeoutId = setTimeout(() => {
            get().hideToast(id);
          }, duration);

          set(currentState => ({
            toasts: currentState.toasts.map(toast =>
              toast.id === id ? { ...toast, timeoutId } : toast
            )
          }), false, 'setToastTimeout');
        }

        return id;
      },

      hideToast: (id) => {
        const state = get();
        const toastToRemove = state.toasts.find(t => t.id === id);

        if (toastToRemove?.timeoutId) {
          clearTimeout(toastToRemove.timeoutId);
        }

        set(currentState => ({
          toasts: currentState.toasts.filter(t => t.id !== id)
        }), false, 'hideToast');

        get().processQueue();
      },

      processQueue: () => {
        const state = get();
        if (state.queue.length === 0 || state.toasts.length >= state.maxVisible) {
          return;
        }

        const nextToast = state.queue[0];
        const remainingQueue = state.queue.slice(1);

        set({
          queue: remainingQueue,
          toasts: [...state.toasts, nextToast].sort((a, b) => {
            const priorityDiff = PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
            return priorityDiff !== 0 ? priorityDiff : a.createdAt - b.createdAt;
          })
        }, false, 'processQueue');

        if (!nextToast.persistent && nextToast.duration > 0) {
          const timeoutId = setTimeout(() => {
            get().hideToast(nextToast.id);
          }, nextToast.duration);

          set(currentState => ({
            toasts: currentState.toasts.map(toast =>
              toast.id === nextToast.id ? { ...toast, timeoutId } : toast
            )
          }), false, 'setQueuedToastTimeout');
        }
      },

      clearToasts: () => {
        const state = get();
        state.toasts.forEach(toast => {
          if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
          }
        });
        set({ toasts: [] }, false, 'clearToasts');
        get().processQueue();
      },

      clearQueue: () => {
        set({ queue: [] }, false, 'clearQueue');
      },

      success: (message, options) => {
        get().showToast(message, 'success', options);
      },

      error: (message, options) => {
        get().showToast(message, 'error', { priority: 'high', ...options });
      },

      warning: (message, options) => {
        get().showToast(message, 'warning', { priority: 'normal', ...options });
      },

      info: (message, options) => {
        get().showToast(message, 'info', options);
      },
    }),
    {
      name: 'ToastStore',
    }
  )
);

export const useToasts = () => useToastStore((state) => state.toasts);
export const useToastQueue = () => useToastStore((state) => state.queue);

export const useToastActions = () => {
  const showToast = useToastStore((state) => state.showToast);
  const hideToast = useToastStore((state) => state.hideToast);
  const clearToasts = useToastStore((state) => state.clearToasts);
  const clearQueue = useToastStore((state) => state.clearQueue);
  const processQueue = useToastStore((state) => state.processQueue);
  const success = useToastStore((state) => state.success);
  const error = useToastStore((state) => state.error);
  const warning = useToastStore((state) => state.warning);
  const info = useToastStore((state) => state.info);

  return {
    showToast,
    hideToast,
    clearToasts,
    clearQueue,
    processQueue,
    success,
    error,
    warning,
    info,
  };
};

export const useToastCount = () => useToastStore(state => state.toasts.length);
export const useQueueCount = () => useToastStore(state => state.queue.length);