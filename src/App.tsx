import { Download, RotateCcw } from "lucide-react";
import { useCallback, useState } from "react";
import { DelusionMeterDisplay } from "./components/DelusionMeterDisplay";
import { DelusionToast } from "./components/DelusionToast";
import { LandingPage } from "./components/LandingPage";
import { LeagueTable } from "./components/LeagueTable";
import { ReactionPanel } from "./components/ReactionPanel";
import {
  crestUrl,
  INITIAL_CLUB_ORDER,
  MAN_UNITED_ID,
  UNITED_START_POSITION,
} from "./data/clubs";
import { POSITION_REACTIONS, TAGLINE } from "./data/reactions";
import {
  buildInitialTable,
  getUnitedPosition,
  moveUnitedToPosition,
  resetTable,
} from "./utils/tableLogic";
import { downloadDataUrl, exportShareCard } from "./utils/exportShareCard";

const unitedMeta = INITIAL_CLUB_ORDER.find((c) => c.id === MAN_UNITED_ID)!;

export default function App() {
  const [started, setStarted] = useState(false);
  const [table, setTable] = useState(buildInitialTable);
  const unitedPosition = getUnitedPosition(table);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastPosition, setToastPosition] = useState<number | null>(null);

  const showDelusionToast = useCallback((position: number) => {
    setToastPosition(position);
    setToastOpen(true);
  }, []);

  const handleMoveUnited = useCallback(
    (position: number) => {
      if (position !== unitedPosition) {
        showDelusionToast(position);
      }
      setTable((prev) => moveUnitedToPosition(prev, position));
    },
    [unitedPosition, showDelusionToast]
  );

  const handleReset = useCallback(() => {
    setTable(resetTable());
    showDelusionToast(UNITED_START_POSITION);
  }, [showDelusionToast]);

  const generateImage = useCallback(async (): Promise<string | null> => {
    const reaction = POSITION_REACTIONS[unitedPosition] ?? "";
    return exportShareCard(unitedPosition, reaction);
  }, [unitedPosition]);

  const handleDownload = useCallback(async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;
    downloadDataUrl(dataUrl, `fix-man-united-${unitedPosition}.png`);
  }, [generateImage, unitedPosition]);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return (
    <div className="flex min-h-dvh flex-col pb-24 sm:pb-20">
      <DelusionToast
        position={toastPosition}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />

      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src={crestUrl(unitedMeta.crestId)}
              alt=""
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-bold uppercase tracking-tight text-zinc-900 sm:text-xl">
                Fix Man <span className="text-mu-red">United</span>
              </h1>
              <p className="truncate text-[10px] font-bold italic text-zinc-600 sm:text-xs">
                {TAGLINE}
              </p>
            </div>
          </div>
          <PositionBadge position={unitedPosition} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-3 pt-4 sm:space-y-5 sm:px-4">
        <LeagueTable
          table={table}
          unitedPosition={unitedPosition}
          onMoveUnited={handleMoveUnited}
        />

        <ReactionPanel position={unitedPosition} />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to {UNITED_START_POSITION}th
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-md border border-mu-red bg-mu-red px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 [&_svg]:stroke-white"
            aria-label="Download PNG"
          >
            <Download className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden />
            <span className="text-white">Download PNG</span>
          </button>
        </div>

        <p className="pb-2 text-center text-xs text-zinc-400">
          Club crests via football-data.org · unofficial fan project
        </p>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
        <DelusionMeterDisplay position={unitedPosition} variant="footer" />
      </footer>

    </div>
  );
}

function PositionBadge({ position }: { position: number }) {
  return (
    <div className="shrink-0 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-center">
      <span className="block text-[10px] font-medium uppercase text-zinc-500">Pos</span>
      <span className="font-display text-xl font-bold leading-none text-mu-red">{position}</span>
    </div>
  );
}