import { motion, AnimatePresence } from "framer-motion";
import { POSITION_REACTIONS } from "../data/reactions";

type Props = {
  position: number;
};

function ordinal(n: number): string {
  const v = n % 100;
  const suffix =
    v >= 11 && v <= 13 ? "TH" : n % 10 === 1 ? "ST" : n % 10 === 2 ? "ND" : n % 10 === 3 ? "RD" : "TH";
  return `${n}${suffix}`;
}

export function ReactionPanel({ position }: Props) {
  const reaction = POSITION_REACTIONS[position] ?? "";

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={position}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Fan reaction
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-900">
          Your Manchester United is currently{" "}
          <span className="text-mu-red">{ordinal(position)}</span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base">{reaction}</p>
      </motion.section>
    </AnimatePresence>
  );
}