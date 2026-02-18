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
import tpmLogo from "@/assets/clubs/tpm.png";
import asvLogo from "@/assets/clubs/asv.png";
import dcmpLogo from "@/assets/clubs/dcmp.png";
import lupopoLogo from "@/assets/clubs/lupopo.png";
import donboscoLogo from "@/assets/clubs/donbosco.png";
import renaissanceLogo from "@/assets/clubs/renaissance.png";
import alahlyLogo from "@/assets/clubs/alahly.png";
import maniemaLogo from "@/assets/clubs/maniema.png";
import bazanoLogo from "@/assets/clubs/bazano.png";
import rdcFlag from "@/assets/clubs/rdc.svg";
import zamFlag from "@/assets/clubs/zam.svg";
// Basketball logos
import lalLogo from "@/assets/clubs/lal.png";
import bosLogo from "@/assets/clubs/bos.png";
import gswLogo from "@/assets/clubs/gsw.png";
import milLogo from "@/assets/clubs/mil.png";
import phxLogo from "@/assets/clubs/phx.png";
import denLogo from "@/assets/clubs/den.png";
import miaLogo from "@/assets/clubs/mia.png";
import nykLogo from "@/assets/clubs/nyk.png";
import rmaLogo from "@/assets/clubs/rma.png";
import fcbLogo from "@/assets/clubs/fcb.png";

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
  TPM: tpmLogo,
  ASV: asvLogo,
  DCMP: dcmpLogo,
  LUP: lupopoLogo,
  DON: donboscoLogo,
  REN: renaissanceLogo,
  AHL: alahlyLogo,
  MAN: maniemaLogo,
  BAZ: bazanoLogo,
  RDC: rdcFlag,
  ZAM: zamFlag,
  // Basketball
  LAL: lalLogo,
  BOS: bosLogo,
  GSW: gswLogo,
  MIL: milLogo,
  PHX: phxLogo,
  DEN: denLogo,
  MIA: miaLogo,
  NYK: nykLogo,
  RMA: rmaLogo,
  FCB: fcbLogo,
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
  MCI: { bg: "#6CABDD", text: "#fff" },
  LIV: { bg: "#C8102E", text: "#fff" },
  BAY: { bg: "#DC052D", text: "#fff" },
  INT: { bg: "#010E80", text: "#fff" },
  TPM: { bg: "#000", text: "#fff" },
  ASV: { bg: "#000", text: "#FFD700" },
  DCMP: { bg: "#fff", text: "#E2001A" },
  RDC: { bg: "#007FFF", text: "#FFD700" },
  ZAM: { bg: "#198754", text: "#fff" },
  // Basketball fallbacks
  LAL: { bg: "#552583", text: "#FDB927" },
  BOS: { bg: "#007A33", text: "#fff" },
  GSW: { bg: "#1D428A", text: "#FFC72C" },
  MIL: { bg: "#00471B", text: "#EEE1C6" },
  PHX: { bg: "#1D1160", text: "#E56020" },
  DEN: { bg: "#0E2240", text: "#FEC524" },
  MIA: { bg: "#98002E", text: "#fff" },
  NYK: { bg: "#006BB6", text: "#F58426" },
  RMA: { bg: "#FEBE10", text: "#00529F" },
  FCB: { bg: "#A50044", text: "#004D98" },
  OLY: { bg: "#CC0000", text: "#fff" },
  FEN: { bg: "#FFED00", text: "#00205B" },
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
