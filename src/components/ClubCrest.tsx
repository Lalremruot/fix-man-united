import { useState } from "react";
import { crestUrl, type Club } from "../data/clubs";

type Props = {
  club: Club;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASS = {
  sm: "h-6 w-6",
  md: "h-8 w-8 sm:h-9 sm:w-9",
  lg: "h-10 w-10 sm:h-11 sm:w-11",
} as const;

export function ClubCrest({ club, size = "md", className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${SIZE_CLASS[size]} flex shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-600 ${className}`}
        aria-hidden
      >
        {club.initials}
      </div>
    );
  }

  return (
    <img
      src={crestUrl(club.crestId)}
      alt=""
      width={44}
      height={44}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${SIZE_CLASS[size]} shrink-0 object-contain ${className}`}
    />
  );
}