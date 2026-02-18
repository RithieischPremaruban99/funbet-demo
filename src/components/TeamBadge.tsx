const teamColors: Record<string, { bg: string; text: string }> = {
  "PSG": { bg: "#004170", text: "#fff" },
  "OM": { bg: "#2FAEE0", text: "#fff" },
  "OL": { bg: "#1D4A8D", text: "#fff" },
  "ASM": { bg: "#E2001A", text: "#fff" },
  "LOSC": { bg: "#E2001A", text: "#fff" },
  "REN": { bg: "#E2001A", text: "#000" },
  "LENS": { bg: "#FFD700", text: "#E2001A" },
  "NICE": { bg: "#000", text: "#E2001A" },
  "STR": { bg: "#009FE3", text: "#fff" },
  "NAN": { bg: "#FCE300", text: "#2D8C3C" },
  "MON": { bg: "#C8102E", text: "#fff" },
  "MAR": { bg: "#2FAEE0", text: "#fff" },
  "BAR": { bg: "#A91B2E", text: "#004D98" },
  "RMA": { bg: "#FEBE10", text: "#000" },
  "MCI": { bg: "#6CABDD", text: "#fff" },
  "LIV": { bg: "#C8102E", text: "#fff" },
  "BAY": { bg: "#DC052D", text: "#fff" },
  "JUV": { bg: "#000", text: "#fff" },
  "INT": { bg: "#010E80", text: "#fff" },
  "DOR": { bg: "#FDE100", text: "#000" },
};

const TeamBadge = ({ abbr, size = 28 }: { abbr: string; size?: number }) => {
  const colors = teamColors[abbr] || { bg: "hsl(var(--muted))", text: "hsl(var(--foreground))" };
  return (
    <div
      className="rounded-full flex items-center justify-center font-black shrink-0 shadow-md"
      style={{
        width: size,
        height: size,
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: size * 0.32,
        letterSpacing: "-0.02em",
      }}
    >
      {abbr}
    </div>
  );
};

export default TeamBadge;
