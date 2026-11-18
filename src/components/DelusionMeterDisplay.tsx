import { motion } from "framer-motion";
import { delusionMeterPercent, getDelusionLevel } from "../data/reactions";

const LEVEL_COLORS: Record<string, string> = {
  "Maximum delusion": "bg-emerald-500",
  Optimism: "bg-green-500",
  "Cautious optimism": "bg-amber-400",
  Denial: "bg-orange-500",
  "Emotional damage": "bg-mu-red",
};

type Props = {
  position: number;
  variant?: "card" | "footer" | "toast";
  showPosition?: boolean;
};

export function DelusionMeterDisplay({
  position,
  variant = "card",
  showPosition = false,
}: Props) {
  const level = getDelusionLevel(position);
  const percent = delusionMeterPercent(position);
  const barColor = LEVEL_COLORS[level] ?? "bg-mu-red";

  if (variant === "footer") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:py-3">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:justify-start sm:gap-3">
          <span className="text-xs font-semibold text-zinc-800 sm:text-sm">Delusion meter</span>
          <span className="text-[11px] font-medium text-zinc-500">{level}</span>
        </div>
        <div className="flex flex-1 items-center gap-3">
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-zinc-200">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={false}
              animate={{ width: `${percent}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
            />
          </div>
          <span className="shrink-0 text-xs font-bold tabular-nums text-zinc-700">{percent}%</span>
        </div>
      </div>
    );
  }

  if (variant === "toast") {
    return (
      <div className="space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Delusion meter updated</p>
            {showPosition && (
              <p className="mt-0.5 text-xs text-zinc-500">
                New table position:{" "}
                <span className="font-semibold text-mu-red">{position}</span>
              </p>
            )}
          </div>
          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-zinc-600">
            {level}
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </div>
        <p className="text-xs text-zinc-500">{percent}% convinced this table is real</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-900">Delusion meter</span>
        <span className="text-xs font-medium text-zinc-500">{level}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500">{percent}% convinced this table is real</p>
    </div>
  );
}