"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info" | "loading";

export type ToastOptions = {
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss after ms. Pass 0 to keep until dismissed (loading defaults to 0). */
  duration?: number;
};

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  push: (title: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 3500;

const variantStyles: Record<
  ToastVariant,
  { icon: React.ReactNode; accent: string }
> = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    accent: "border-l-emerald-500",
  },
  error: {
    icon: <AlertCircle className="h-5 w-5 text-rose-500" />,
    accent: "border-l-rose-500",
  },
  info: {
    icon: <Info className="h-5 w-5 text-sky-500" />,
    accent: "border-l-sky-500",
  },
  loading: {
    icon: <Spinner size="md" className="text-amber-500" />,
    accent: "border-l-amber-500",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (title: string, options: ToastOptions = {}) => {
      const id = Math.random().toString(36).slice(2);
      const variant = options.variant ?? "info";
      setToasts((prev) => [
        ...prev,
        { id, title, description: options.description, variant },
      ]);
      const duration =
        options.duration ?? (variant === "loading" ? 0 : DEFAULT_DURATION);
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function Toaster({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end gap-2 p-4 sm:p-6">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const style = variantStyles[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-xl border border-l-4 border-stone-200/70 bg-white px-4 py-3 shadow-lg",
                  style.accent
                )}
                role="status"
              >
                <span className="mt-0.5 shrink-0">{style.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-stone-900">{t.title}</p>
                  {t.description && (
                    <p className="mt-0.5 text-xs text-stone-500">{t.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onDismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="-mr-1 shrink-0 rounded-md p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Toast helper. `toast(title, opts)` or shorthands `toast.success/error/info/loading`.
 * `loading` stays until you call `toast.dismiss(id)`.
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  const { push, dismiss } = ctx;

  const toast = useMemo(() => {
    const base = (title: string, opts?: ToastOptions) => push(title, opts);
    return Object.assign(base, {
      success: (title: string, opts?: ToastOptions) =>
        push(title, { ...opts, variant: "success" }),
      error: (title: string, opts?: ToastOptions) =>
        push(title, { ...opts, variant: "error" }),
      info: (title: string, opts?: ToastOptions) =>
        push(title, { ...opts, variant: "info" }),
      loading: (title: string, opts?: ToastOptions) =>
        push(title, { ...opts, variant: "loading" }),
      dismiss,
    });
  }, [push, dismiss]);

  return { toast, dismiss };
}
