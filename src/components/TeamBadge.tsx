import psgLogo from "@/assets/clubs/psg.svg";
import omLogo from "@/assets/clubs/om.svg";
import olLogo from "@/assets/clubs/ol.png";
import bayLogo from "@/assets/clubs/bay.svg";
import barLogo from "@/assets/clubs/bar.svg";
import livLogo from "@/assets/clubs/liv.svg";
import mciLogo from "@/assets/clubs/mci.svg";
import asmLogo from "@/assets/clubs/asm.png";
import lensLogo from "@/assets/clubs/lens.png";
import loscLogo from "@/assets/clubs/losc.svg";
import niceLogo from "@/assets/clubs/nice.png";
import intLogo from "@/assets/clubs/int.svg";

const clubLogos: Record<string, string> = {
  PSG: psgLogo,
  OM: omLogo,
  OL: olLogo,
  BAY: bayLogo,
  BAR: barLogo,
  LIV: livLogo,
  MCI: mciLogo,
  ASM: asmLogo,
  LENS: lensLogo,
  LOSC: loscLogo,
  NICE: niceLogo,
  INT: intLogo,
};

const fallbackColors: Record<string, { bg: string; text: string }> = {
  PSG: { bg: "#004170", text: "#fff" },
  OM: { bg: "#2FAEE0", text: "#fff" },
  OL: { bg: "#1D4A8D", text: "#fff" },
  ASM: { bg: "#E2001A", text: "#fff" },
  LOSC: { bg: "#E2001A", text: "#fff" },
  LENS: { bg: "#FFD700", text: "#E2001A" },
  NICE: { bg: "#000", text: "#E2001A" },
  BAR: { bg: "#A91B2E", text: "#004D98" },
  RMA: { bg: "#FEBE10", text: "#000" },
  MCI: { bg: "#6CABDD", text: "#fff" },
  LIV: { bg: "#C8102E", text: "#fff" },
  BAY: { bg: "#DC052D", text: "#fff" },
  INT: { bg: "#010E80", text: "#fff" },
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
