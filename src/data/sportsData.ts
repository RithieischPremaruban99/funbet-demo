export interface MatchData {
  id: number;
  league: string;
  time?: string;
  score?: string;
  date?: string;
  home: { name: string; abbr: string };
  away: { name: string; abbr: string };
  odds: { home: string; draw: string; away: string };
  live?: boolean;
}

export const matchesBySport: Record<string, { live: MatchData[]; upcoming: MatchData[] }> = {
  Football: {
    live: [
      { id: 1, league: "DStv Premiership - Matchday 22", time: "72'", score: "1 - 1", home: { name: "Kaizer Chiefs", abbr: "KC" }, away: { name: "Orlando Pirates", abbr: "OP" }, odds: { home: "2.80", draw: "3.10", away: "2.50" }, live: true },
      { id: 2, league: "DStv Premiership - Matchday 22", time: "55'", score: "2 - 0", home: { name: "Mamelodi Sundowns", abbr: "SUN" }, away: { name: "SuperSport Utd", abbr: "SSU" }, odds: { home: "1.35", draw: "4.20", away: "7.50" }, live: true },
      { id: 3, league: "DStv Premiership - Matchday 22", time: "38'", score: "0 - 0", home: { name: "AmaZulu FC", abbr: "AMA" }, away: { name: "Royal AM", abbr: "RAM" }, odds: { home: "2.10", draw: "3.00", away: "3.60" }, live: true },
    ],
    upcoming: [
      { id: 4, league: "DStv Premiership - Matchday 23", date: "TOMORROW 19:30", home: { name: "Cape Town City", abbr: "CTC" }, away: { name: "Stellenbosch FC", abbr: "SFC" }, odds: { home: "2.10", draw: "3.00", away: "3.50" } },
      { id: 5, league: "DStv Premiership - Matchday 23", date: "SAT 17:00", home: { name: "Chippa United", abbr: "CHI" }, away: { name: "TS Galaxy", abbr: "TSG" }, odds: { home: "2.40", draw: "2.90", away: "3.20" } },
      { id: 6, league: "Nedbank Cup - Quarter Final", date: "SAT 20:00", home: { name: "Orlando Pirates", abbr: "OP" }, away: { name: "Mamelodi Sundowns", abbr: "SUN" }, odds: { home: "2.60", draw: "3.10", away: "2.70" } },
      { id: 7, league: "Premier League", date: "SUN 16:00", home: { name: "Liverpool FC", abbr: "LIV" }, away: { name: "Manchester City", abbr: "MCI" }, odds: { home: "1.80", draw: "3.50", away: "4.50" } },
    ],
  },
  Cricket: {
    live: [
      { id: 101, league: "SA20 - Qualifier", time: "15th Over", score: "128/3", home: { name: "Joburg Super Kings", abbr: "JSK" }, away: { name: "Paarl Royals", abbr: "PR" }, odds: { home: "1.75", draw: "-", away: "2.10" }, live: true },
      { id: 102, league: "SA20 - Eliminator", time: "8th Over", score: "62/1", home: { name: "MI Cape Town", abbr: "MICT" }, away: { name: "Durban Super Giants", abbr: "DSG" }, odds: { home: "1.90", draw: "-", away: "1.95" }, live: true },
    ],
    upcoming: [
      { id: 103, league: "Proteas vs India - 2nd Test", date: "SAT 10:00", home: { name: "South Africa", abbr: "SA" }, away: { name: "India", abbr: "IND" }, odds: { home: "2.40", draw: "3.80", away: "2.60" } },
      { id: 104, league: "SA20 - Final", date: "SUN 14:00", home: { name: "Joburg Super Kings", abbr: "JSK" }, away: { name: "MI Cape Town", abbr: "MICT" }, odds: { home: "1.85", draw: "-", away: "2.00" } },
      { id: 105, league: "CSA T20 Challenge", date: "MON 18:00", home: { name: "Titans", abbr: "TIT" }, away: { name: "Dolphins", abbr: "DOL" }, odds: { home: "1.70", draw: "-", away: "2.20" } },
      { id: 106, league: "IPL", date: "FRI 16:00", home: { name: "Mumbai Indians", abbr: "MI" }, away: { name: "Chennai Super Kings", abbr: "CSK" }, odds: { home: "1.95", draw: "-", away: "1.90" } },
    ],
  },
  "Horse Racing": {
    live: [
      { id: 201, league: "Turffontein - Race 5", time: "Running", score: "1400m", home: { name: "#3 Star Gazer", abbr: "R5" }, away: { name: "8 Runners", abbr: "TF" }, odds: { home: "3.50", draw: "-", away: "2.80" }, live: true },
    ],
    upcoming: [
      { id: 202, league: "Turffontein - Race 6", date: "TODAY 14:30", home: { name: "#1 Cape Storm", abbr: "R6" }, away: { name: "10 Runners", abbr: "TF" }, odds: { home: "4.00", draw: "-", away: "3.20" } },
      { id: 203, league: "Kenilworth - Met Stakes", date: "SAT 15:00", home: { name: "#2 Rainbow", abbr: "MET" }, away: { name: "12 Runners", abbr: "KW" }, odds: { home: "5.50", draw: "-", away: "3.80" } },
      { id: 204, league: "Greyville - Gold Cup", date: "SAT 16:30", home: { name: "#5 Durban July", abbr: "GC" }, away: { name: "14 Runners", abbr: "GV" }, odds: { home: "6.00", draw: "-", away: "4.50" } },
      { id: 205, league: "Hollywoodbets Scottsville", date: "SUN 13:00", home: { name: "#4 Gold Rush", abbr: "R3" }, away: { name: "9 Runners", abbr: "SC" }, odds: { home: "3.20", draw: "-", away: "2.60" } },
    ],
  },
  Rugby: {
    live: [],
    upcoming: [
      { id: 301, league: "United Rugby Championship", date: "SAT 17:05", home: { name: "Stormers", abbr: "STO" }, away: { name: "Bulls", abbr: "BUL" }, odds: { home: "2.20", draw: "21.00", away: "1.70" } },
      { id: 302, league: "United Rugby Championship", date: "SAT 19:15", home: { name: "Sharks", abbr: "SHA" }, away: { name: "Lions", abbr: "LIO" }, odds: { home: "1.55", draw: "17.00", away: "2.50" } },
      { id: 303, league: "Currie Cup", date: "SUN 15:00", home: { name: "Western Province", abbr: "WP" }, away: { name: "Blue Bulls", abbr: "BB" }, odds: { home: "1.80", draw: "19.00", away: "2.10" } },
    ],
  },
  Tennis: {
    live: [
      { id: 401, league: "ATP Masters 1000 - Indian Wells", time: "Set 2 - 4:3", score: "6-4 / 4-3", home: { name: "C. Alcaraz", abbr: "ALC" }, away: { name: "N. Djokovic", abbr: "DJO" }, odds: { home: "1.60", draw: "-", away: "2.30" }, live: true },
    ],
    upcoming: [
      { id: 402, league: "ATP Masters 1000 - Indian Wells", date: "TODAY 18:00", home: { name: "J. Sinner", abbr: "SIN" }, away: { name: "D. Medvedev", abbr: "MED" }, odds: { home: "1.45", draw: "-", away: "2.70" } },
      { id: 403, league: "WTA 1000 - Indian Wells", date: "TODAY 20:00", home: { name: "I. Świątek", abbr: "SWI" }, away: { name: "A. Sabalenka", abbr: "SAB" }, odds: { home: "1.80", draw: "-", away: "2.00" } },
      { id: 404, league: "ATP 500 - Dubai", date: "TOMORROW 16:00", home: { name: "S. Tsitsipas", abbr: "TSI" }, away: { name: "A. Rublev", abbr: "RUB" }, odds: { home: "2.10", draw: "-", away: "1.75" } },
      { id: 405, league: "ATP 500 - Dubai", date: "TOMORROW 19:00", home: { name: "H. Rune", abbr: "RUN" }, away: { name: "T. Fritz", abbr: "FRI" }, odds: { home: "2.40", draw: "-", away: "1.58" } },
    ],
  },
};
