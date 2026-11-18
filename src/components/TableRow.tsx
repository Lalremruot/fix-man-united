import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Club } from "../data/clubs";
import { MAN_UNITED_ID } from "../data/clubs";
import { CLUB_STANDINGS } from "../data/standings";
import { ClubCrest } from "./ClubCrest";

type RowProps = {
  club: Club;
  position: number;
  isUnitedDragging: boolean;
  onUnitedKeyDown?: (e: React.KeyboardEvent) => void;
  zebra: boolean;
};

function zoneBorder(position: number): string {
  if (position <= 4) return "border-l-pl-champions";
  if (position === 5) return "border-l-pl-europa";
  if (position >= 18) return "border-l-pl-relegation";
  return "border-l-transparent";
}

export function TableRow({
  club,
  position,
  isUnitedDragging,
  onUnitedKeyDown,
  zebra,
}: RowProps) {
  const isUnited = club.id === MAN_UNITED_ID;
  const stats = CLUB_STANDINGS[club.id];

  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } =
    useSortable({
      id: club.id,
      disabled: isUnited ? false : { draggable: true, droppable: false },
    });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: isUnited ? "none" : undefined,
  };

  const showDropHint = isUnitedDragging && isOver && !isUnited;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "group relative flex min-h-[46px] items-center gap-1 border-b border-zinc-200/80 py-2 pl-1 pr-2 sm:min-h-[48px] sm:gap-2 sm:pl-2 sm:pr-3",
        zebra ? "bg-zinc-50/80" : "bg-white",
        isUnited
          ? "cursor-grab bg-red-50/90 active:cursor-grabbing sm:bg-red-50"
          : "",
        showDropHint ? "bg-violet-50 ring-1 ring-inset ring-pl-purple/30" : "",
        isDragging ? "z-50 opacity-40" : "",
      ].join(" ")}
      {...(isUnited ? attributes : {})}
      {...(isUnited ? listeners : {})}
      onKeyDown={isUnited ? onUnitedKeyDown : undefined}
      role="row"
      aria-grabbed={isUnited ? isDragging : undefined}
      tabIndex={isUnited ? 0 : undefined}
    >
      <span
        className={`w-6 shrink-0 text-left text-xs font-semibold tabular-nums sm:w-7 sm:text-sm ${
          isUnited ? "text-mu-red" : "text-zinc-600"
        }`}
        role="cell"
      >
        {position}
      </span>

      <div
        className={`flex min-w-0 flex-1 items-center gap-2 border-l-[3px] py-0.5 pl-2 sm:gap-2.5 sm:pl-2.5 ${zoneBorder(position)}`}
        role="cell"
      >
        <ClubCrest club={club} size="md" />
        <div className="min-w-0 flex-1">
          <span
            className={`block truncate text-[13px] font-semibold leading-tight sm:text-sm ${
              isUnited ? "text-zinc-900" : "text-zinc-800"
            }`}
          >
            <span className="sm:hidden">{club.shortName}</span>
            <span className="hidden sm:inline">{club.name}</span>
          </span>
          {isUnited && (
            <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-mu-red sm:text-[11px]">
              <GripVertical className="h-3 w-3" aria-hidden />
              Drag to reposition
            </span>
          )}
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4" role="cell">
        <span
          className={`w-8 text-right text-xs font-medium tabular-nums sm:w-9 sm:text-sm ${
            stats && stats.gd >= 0 ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {stats ? (stats.gd > 0 ? `+${stats.gd}` : stats.gd) : "—"}
        </span>
        <span className="w-9 text-right text-sm font-bold tabular-nums text-zinc-900 sm:w-10">
          {stats?.points ?? "—"}
        </span>
      </div>
    </div>
  );
}