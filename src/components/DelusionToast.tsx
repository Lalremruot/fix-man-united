import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { DelusionMeterDisplay } from "./DelusionMeterDisplay";

const AUTO_DISMISS_MS = 4500;

type Props = {
  position: number | null;
  open: boolean;
  onClose: () => void;
};

export function DelusionToast({ position, open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(onClose, AUTO_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [open, position, onClose]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[4.25rem] z-50 flex justify-center px-3 sm:top-[4.5rem]"
      aria-live="polite"
    >
      <AnimatePresence>
        {open && position != null && (
          <motion.div
            key={position}
            role="status"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="pointer-events-auto relative w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-4 pr-10 shadow-lg ring-1 ring-black/5"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
            <DelusionMeterDisplay position={position} variant="toast" showPosition />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}