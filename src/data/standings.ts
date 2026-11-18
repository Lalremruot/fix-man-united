export type ClubStandings = {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
};

/** Fictional season stats — travel with each club when the table is reordered. */
export const CLUB_STANDINGS: Record<string, ClubStandings> = {
  arsenal: { played: 34, won: 23, drawn: 7, lost: 4, gd: 38, points: 76 },
  "man-city": { played: 34, won: 22, drawn: 6, lost: 6, gd: 41, points: 72 },
  liverpool: { played: 34, won: 21, drawn: 7, lost: 6, gd: 35, points: 70 },
  chelsea: { played: 34, won: 18, drawn: 8, lost: 8, gd: 18, points: 62 },
  tottenham: { played: 34, won: 17, drawn: 6, lost: 11, gd: 9, points: 57 },
  newcastle: { played: 34, won: 16, drawn: 7, lost: 11, gd: 12, points: 55 },
  "aston-villa": { played: 34, won: 15, drawn: 8, lost: 11, gd: 8, points: 53 },
  brighton: { played: 34, won: 14, drawn: 9, lost: 11, gd: 5, points: 51 },
  "west-ham": { played: 34, won: 13, drawn: 8, lost: 13, gd: -2, points: 47 },
  "crystal-palace": { played: 34, won: 12, drawn: 10, lost: 12, gd: -1, points: 46 },
  fulham: { played: 34, won: 12, drawn: 7, lost: 15, gd: -4, points: 43 },
  brentford: { played: 34, won: 11, drawn: 9, lost: 14, gd: -6, points: 42 },
  everton: { played: 34, won: 11, drawn: 8, lost: 15, gd: -8, points: 41 },
  nottingham: { played: 34, won: 10, drawn: 9, lost: 15, gd: -10, points: 39 },
  bournemouth: { played: 34, won: 10, drawn: 8, lost: 16, gd: -11, points: 38 },
  wolves: { played: 34, won: 9, drawn: 10, lost: 15, gd: -12, points: 37 },
  leicester: { played: 34, won: 9, drawn: 7, lost: 18, gd: -15, points: 34 },
  "manchester-united": { played: 34, won: 8, drawn: 7, lost: 19, gd: -14, points: 31 },
  southampton: { played: 34, won: 6, drawn: 6, lost: 22, gd: -24, points: 24 },
  ipswich: { played: 34, won: 5, drawn: 8, lost: 21, gd: -28, points: 23 },
};