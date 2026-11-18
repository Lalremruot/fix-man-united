import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useState } from "react";
import type { Club } from "../data/clubs";
import { MAN_UNITED_ID } from "../data/clubs";
import { CLUB_STANDINGS } from "../data/standings";
import { ClubCrest } from "./ClubCrest";
import { TableRow } from "./TableRow";

type Props = {
  table: Club[];
  unitedPosition: number;
  onMoveUnited: (position: number) => void;
};

function UnitedDragPreview({ club, position }: { club: Club; position: number }) {
  const stats = CLUB_STANDINGS[club.id];
  return (
    <div className="flex w-[min(100vw-2rem,420px)] items-center gap-3 border border-zinc-200 bg-white px-3 py-2.5 shadow-xl ring-2 ring-mu-red/40">
      <span className="w-6 text-center text-sm font-semibold text-mu-red">{position}</span>
      <ClubCrest club={club} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900">{club.name}</p>
        <p className="text-xs text-zinc-500">{stats?.points ?? 0} pts · fictional table</p>
      </div>
    </div>
  );
}

const collisionDetection: CollisionDetection = (args) => {
  const pointer = pointerWithin(args);
  if (pointer.length > 0) return pointer;
  return closestCenter(args);
};

export function LeagueTable({ table, unitedPosition, onMoveUnited }: Props) {
  const [isUnitedDragging, setIsUnitedDragging] = useState(false);
  const united = table.find((c) => c.id === MAN_UNITED_ID)!;
  const sortableIds = table.map((c) => c.id);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 12 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.id === MAN_UNITED_ID) setIsUnitedDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsUnitedDragging(false);
    const { active, over } = event;
    if (!over || active.id !== MAN_UNITED_ID) return;
    if (active.id === over.id) return;
    const overIndex = table.findIndex((c) => c.id === over.id);
    if (overIndex >= 0) onMoveUnited(overIndex + 1);
  };

  const handleUnitedKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        onMoveUnited(Math.max(1, unitedPosition - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onMoveUnited(Math.min(20, unitedPosition + 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        onMoveUnited(1);
      } else if (e.key === "End") {
        e.preventDefault();
        onMoveUnited(20);
      }
    },
    [onMoveUnited, unitedPosition]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setIsUnitedDragging(false)}
    >
      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-[#37003c] px-3 py-2.5 sm:px-4">
          <h2 className="text-sm font-bold text-white sm:text-base">Premier League · 2025/26</h2>
          <p className="mt-1.5 text-[11px] leading-snug text-white/90 sm:text-xs">
            Drag <strong className="font-semibold text-white">Manchester United</strong> onto any
            row. Other clubs stay fixed — only league position changes.
          </p>
        </div>

        <div role="table" aria-label="Premier League table">
            <div
              className="flex items-center gap-1 border-b border-zinc-200 bg-zinc-100/90 py-2 pl-1 pr-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 sm:gap-2 sm:pl-2 sm:pr-3 sm:text-[11px]"
              role="row"
            >
              <span className="w-6 shrink-0 text-left sm:w-7" role="columnheader">
                #
              </span>
              <span className="min-w-0 flex-1 border-l border-l-transparent pl-2 sm:pl-2.5" role="columnheader">
                Club
              </span>
              <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
                <span className="w-8 text-right sm:w-9" role="columnheader">
                  GD
                </span>
                <span className="w-9 text-right sm:w-10" role="columnheader">
                  Pts
                </span>
              </div>
            </div>

            <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
              {table.map((club, index) => (
                <TableRow
                  key={club.id}
                  club={club}
                  position={index + 1}
                  isUnitedDragging={isUnitedDragging}
                  onUnitedKeyDown={
                    club.id === MAN_UNITED_ID ? handleUnitedKeyDown : undefined
                  }
                  zebra={index % 2 === 1}
                />
              ))}
            </SortableContext>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-zinc-100 bg-zinc-50 px-3 py-2 text-[10px] text-zinc-500 sm:px-4">
          <Legend accent="border-l-pl-champions" label="UCL places" />
          <Legend accent="border-l-pl-europa" label="Europa" />
          <Legend accent="border-l-pl-relegation" label="Relegation" />
        </div>
      </section>

      <DragOverlay adjustScale={false} dropAnimation={{ duration: 180, easing: "ease-out" }}>
        {isUnitedDragging ? <UnitedDragPreview club={united} position={unitedPosition} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function Legend({ accent, label }: { accent: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3.5 w-1 rounded-full border-l-[3px] bg-zinc-200 ${accent}`} />
      {label}
    </span>
  );
}
