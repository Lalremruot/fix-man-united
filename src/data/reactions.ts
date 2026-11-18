export type DelusionLevel =
  | "Maximum delusion"
  | "Optimism"
  | "Cautious optimism"
  | "Denial"
  | "Emotional damage";

export const POSITION_REACTIONS: Record<number, string> = {
  1: "CHAMPIONS OF ENGLAND! SIR ALEX IS SMILING FROM HEAVEN. 🏆",
  2: "THE RED DEVILS ARE BACK! EVERYONE ELSE IS JUST COMPETING. 🔥",
  3: "THIRD PLACE? WE'LL TAKE IT. PROGRESS IS PROGRESS. 😭",
  4: "CHAMPIONS LEAGUE FOOTBALL! WE USED TO PRAY FOR TIMES LIKE THIS.",
  5: "TOP FIVE. THE PROJECT IS FINALLY WORKING. 👀",
  6: "WE ARE COOKING. JUST NEED TWO MORE SIGNINGS.",
  7: "SEVENTH? THE REFEREES COST US THE TITLE.",
  8: "NOT BAD. NEXT SEASON WE GO AGAIN.",
  9: "MID-TABLE? IT'S A TRANSITION SEASON.",
  10: "TEN HAG? AMORIM? WHOEVER IT IS, TRUST THE PROCESS. 💀",
  11: "WE'RE BUILDING SOMETHING. PLEASE BE PATIENT.",
  12: "AT LEAST WE'RE NOT IN THE RELEGATION ZONE.",
  13: "THE GLazers ARE STILL THE PROBLEM. 😭",
  14: "WE NEED A NEW MANAGER. AGAIN.",
  15: "THIS IS NOT THE MANCHESTER UNITED I GREW UP WATCHING.",
  16: "SOMEONE CHECK ON OLD TRAFFORD.",
  17: "WE'RE ONE LOSS AWAY FROM A FAN PROTEST.",
  18: "WHY DO WE DO THIS TO OURSELVES? 💔",
  19: "JUST SELL THE CLUB. I'M TIRED.",
  20: "CHAMPIONSHIP LOADING… DELETE THIS APP. 😭",
};

export function getDelusionLevel(position: number): DelusionLevel {
  if (position <= 3) return "Maximum delusion";
  if (position <= 6) return "Optimism";
  if (position <= 10) return "Cautious optimism";
  if (position <= 15) return "Denial";
  return "Emotional damage";
}

export function delusionMeterPercent(position: number): number {
  return Math.round(((21 - position) / 20) * 100);
}

export const TAGLINE = "WE CAN'T FIX THE CLUB. BUT WE CAN FIX THE TABLE.";