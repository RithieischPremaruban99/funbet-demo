import psgLogo from "@/assets/clubs/psg.svg";
import omLogo from "@/assets/clubs/om.svg";
import bayLogo from "@/assets/clubs/bay.svg";
import barLogo from "@/assets/clubs/bar.svg";
import livLogo from "@/assets/clubs/liv.svg";
import mciLogo from "@/assets/clubs/mci.svg";
import intLogo from "@/assets/clubs/int.svg";

const clubLogos: Record<string, string> = {
  PSG: psgLogo,
  OM: omLogo,
  BAY: bayLogo,
  BAR: barLogo,
  LIV: livLogo,
  MCI: mciLogo,
  INT: intLogo,
};

const fallbackColors: Record<string, { bg: string; text: string }> = {
  // SA Football
  KC: { bg: "#000000", text: "#FFD700" },
  OP: { bg: "#000000", text: "#FFFFFF" },
  SUN: { bg: "#FFD700", text: "#003399" },
  SSU: { bg: "#003399", text: "#FFFFFF" },
  AMA: { bg: "#006633", text: "#FFFFFF" },
  RAM: { bg: "#8B0000", text: "#FFD700" },
  CTC: { bg: "#87CEEB", text: "#003399" },
  SFC: { bg: "#8B0000", text: "#FFFFFF" },
  CHI: { bg: "#006633", text: "#FFFFFF" },
  TSG: { bg: "#FF6600", text: "#000000" },
  // Cricket
  JSK: { bg: "#FFD700", text: "#003399" },
  PR: { bg: "#8B008B", text: "#FFD700" },
  MICT: { bg: "#004B87", text: "#FFFFFF" },
  DSG: { bg: "#FF4500", text: "#FFFFFF" },
  SA: { bg: "#007749", text: "#FFD700" },
  IND: { bg: "#0066CC", text: "#FF9933" },
  TIT: { bg: "#87CEEB", text: "#003399" },
  DOL: { bg: "#333333", text: "#FFFFFF" },
  MI: { bg: "#004B87", text: "#FFD700" },
  CSK: { bg: "#FFD700", text: "#0066CC" },
  // Horse Racing
  R5: { bg: "#8B4513", text: "#FFD700" },
  R6: { bg: "#8B4513", text: "#FFD700" },
  TF: { bg: "#2E8B57", text: "#FFFFFF" },
  MET: { bg: "#800020", text: "#FFD700" },
  KW: { bg: "#2E8B57", text: "#FFFFFF" },
  GC: { bg: "#006633", text: "#FFD700" },
  GV: { bg: "#2E8B57", text: "#FFFFFF" },
  R3: { bg: "#8B4513", text: "#FFD700" },
  SC: { bg: "#2E8B57", text: "#FFFFFF" },
  // Rugby
  STO: { bg: "#003DA5", text: "#FFFFFF" },
  BUL: { bg: "#003DA5", text: "#FFFFFF" },
  SHA: { bg: "#000000", text: "#FFFFFF" },
  LIO: { bg: "#E2001A", text: "#FFFFFF" },
  WP: { bg: "#003DA5", text: "#FFFFFF" },
  BB: { bg: "#003DA5", text: "#FFFFFF" },
  // International football
  PSG: { bg: "#004170", text: "#fff" },
  OM: { bg: "#2FAEE0", text: "#fff" },
  BAR: { bg: "#A91B2E", text: "#004D98" },
  MCI: { bg: "#6CABDD", text: "#fff" },
  LIV: { bg: "#C8102E", text: "#fff" },
  BAY: { bg: "#DC052D", text: "#fff" },
  INT: { bg: "#010E80", text: "#fff" },
  // Tennis
  ALC: { bg: "#E2001A", text: "#FFD700" },
  DJO: { bg: "#003DA5", text: "#FFFFFF" },
  SIN: { bg: "#006633", text: "#FFFFFF" },
  MED: { bg: "#E2001A", text: "#FFFFFF" },
  SWI: { bg: "#DC143C", text: "#FFFFFF" },
  SAB: { bg: "#006633", text: "#FFFFFF" },
  TSI: { bg: "#003DA5", text: "#FFFFFF" },
  RUB: { bg: "#E2001A", text: "#FFFFFF" },
  RUN: { bg: "#E2001A", text: "#FFFFFF" },
  FRI: { bg: "#003DA5", text: "#FFFFFF" },
};

const TeamBadge = ({ abbr, size = 28 }: { abbr: string; size?: number }) => {
  const logo = clubLogos[abbr];

  if (logo) {
    return (
      <img
        src={logo}
        alt={abbr}
        className="rounded-full object-contain shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  const colors = fallbackColors[abbr] || { bg: "hsl(var(--muted))", text: "hsl(var(--foreground))" };
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
