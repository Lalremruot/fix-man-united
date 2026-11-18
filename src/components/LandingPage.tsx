import { motion } from "framer-motion";
import { crestUrl, MAN_UNITED_ID, INITIAL_CLUB_ORDER } from "../data/clubs";
import { TAGLINE } from "../data/reactions";

type Props = {
  onStart: () => void;
};

const united = INITIAL_CLUB_ORDER.find((c) => c.id === MAN_UNITED_ID)!;

export function LandingPage({ onStart }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="bg-pl-purple px-4 py-3 text-white">
        <p className="text-center text-xs font-medium tracking-wide opacity-90">Premier League · Parody</p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md text-center"
        >
          <img
            src={crestUrl(united.crestId)}
            alt="Manchester United"
            width={88}
            height={88}
            className="mx-auto h-20 w-20 object-contain sm:h-24 sm:w-24"
            referrerPolicy="no-referrer"
          />
          <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-tight text-zinc-900 sm:text-5xl">
            Fix Man <span className="text-mu-red">United</span>
          </h1>
          <p className="mt-3 text-base text-zinc-600 sm:text-lg">
            20 positions. 19 excuses. One club to fix.
          </p>
          <p className="mt-2 text-sm font-bold italic text-zinc-600">{TAGLINE}</p>

          <button
            type="button"
            onClick={onStart}
            className="mt-8 w-full rounded-md bg-mu-red px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.99] sm:w-auto sm:min-w-[260px]"
          >
            Open league table
          </button>
          <p className="mt-6 text-xs text-zinc-400">
            This is a meme. Don&apos;t take it seriously. We know you won&apos;t.
          </p>
        </motion.div>
      </div>
    </div>
  );
}