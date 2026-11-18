export const MAN_UNITED_ID = "manchester-united";

export type Club = {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  accent: string;
  /** football-data.org crest id */
  crestId: number;
};

export function crestUrl(crestId: number): string {
  return `https://crests.football-data.org/${crestId}.png`;
}

/** Fixed league order (positions 1–20) before United is placed at 18. */
export const INITIAL_CLUB_ORDER: Club[] = [
  { id: "arsenal", name: "Arsenal", shortName: "Arsenal", initials: "ARS", accent: "#EF0107", crestId: 57 },
  { id: "man-city", name: "Manchester City", shortName: "Man City", initials: "MCI", accent: "#6CABDD", crestId: 65 },
  { id: "liverpool", name: "Liverpool", shortName: "Liverpool", initials: "LIV", accent: "#C8102E", crestId: 64 },
  { id: "chelsea", name: "Chelsea", shortName: "Chelsea", initials: "CHE", accent: "#034694", crestId: 61 },
  { id: "tottenham", name: "Tottenham Hotspur", shortName: "Spurs", initials: "TOT", accent: "#132257", crestId: 73 },
  { id: "newcastle", name: "Newcastle United", shortName: "Newcastle", initials: "NEW", accent: "#241F20", crestId: 67 },
  { id: "aston-villa", name: "Aston Villa", shortName: "Aston Villa", initials: "AVL", accent: "#670E36", crestId: 58 },
  { id: "brighton", name: "Brighton & Hove Albion", shortName: "Brighton", initials: "BHA", accent: "#0057B8", crestId: 397 },
  { id: "west-ham", name: "West Ham United", shortName: "West Ham", initials: "WHU", accent: "#7A263A", crestId: 563 },
  { id: "crystal-palace", name: "Crystal Palace", shortName: "Crystal Palace", initials: "CRY", accent: "#1B458F", crestId: 354 },
  { id: "fulham", name: "Fulham", shortName: "Fulham", initials: "FUL", accent: "#000000", crestId: 63 },
  { id: "brentford", name: "Brentford", shortName: "Brentford", initials: "BRE", accent: "#E30613", crestId: 402 },
  { id: "everton", name: "Everton", shortName: "Everton", initials: "EVE", accent: "#003399", crestId: 62 },
  { id: "nottingham", name: "Nottingham Forest", shortName: "Nott'm Forest", initials: "NFO", accent: "#DD0000", crestId: 351 },
  { id: "bournemouth", name: "AFC Bournemouth", shortName: "Bournemouth", initials: "BOU", accent: "#DA291C", crestId: 1044 },
  { id: "wolves", name: "Wolverhampton Wanderers", shortName: "Wolves", initials: "WOL", accent: "#FDB913", crestId: 76 },
  { id: "leicester", name: "Leicester City", shortName: "Leicester", initials: "LEI", accent: "#003090", crestId: 338 },
  {
    id: MAN_UNITED_ID,
    name: "Manchester United",
    shortName: "Man Utd",
    initials: "MUN",
    accent: "#DA291C",
    crestId: 66,
  },
  { id: "southampton", name: "Southampton", shortName: "Southampton", initials: "SOU", accent: "#D71920", crestId: 340 },
  { id: "ipswich", name: "Ipswich Town", shortName: "Ipswich", initials: "IPS", accent: "#003399", crestId: 349 },
];

export const UNITED_START_POSITION = 18;