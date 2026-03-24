import psgLogo from "@/assets/clubs/psg.svg";
import omLogo from "@/assets/clubs/om.svg";
import bayLogo from "@/assets/clubs/bay.svg";
import barLogo from "@/assets/clubs/bar.svg";
import livLogo from "@/assets/clubs/liv.svg";
import mciLogo from "@/assets/clubs/mci.svg";
import intLogo from "@/assets/clubs/int.svg";
// SA Football
import kcLogo from "@/assets/clubs/kc.png";
import opLogo from "@/assets/clubs/op.png";
import sunLogo from "@/assets/clubs/sun.png";
import ssuLogo from "@/assets/clubs/ssu.png";
import amaLogo from "@/assets/clubs/ama.png";
import ramLogo from "@/assets/clubs/ram.png";
import ctcLogo from "@/assets/clubs/ctc.png";
import sfcLogo from "@/assets/clubs/sfc.png";
import chiLogo from "@/assets/clubs/chi.png";
import tsgLogo from "@/assets/clubs/tsg.png";
// SA Cricket
import jskLogo from "@/assets/clubs/jsk.png";
import prLogo from "@/assets/clubs/pr.png";
import mictLogo from "@/assets/clubs/mict.png";
import dsgLogo from "@/assets/clubs/dsg.png";
import saLogo from "@/assets/clubs/sa.png";
import indLogo from "@/assets/clubs/ind.png";
import titLogo from "@/assets/clubs/tit.png";
import dolLogo from "@/assets/clubs/dol.png";
import miLogo from "@/assets/clubs/mi.png";
import cskLogo from "@/assets/clubs/csk.png";
// SA Rugby
import stoLogo from "@/assets/clubs/sto.png";
import bulLogo from "@/assets/clubs/bul.png";
import lioLogo from "@/assets/clubs/lio.png";
import shaLogo from "@/assets/clubs/sha.png";
// Horse Racing Tracks
import tfLogo from "@/assets/clubs/tf.png";
import kwLogo from "@/assets/clubs/kw.png";
import gvLogo from "@/assets/clubs/gv.png";
import scLogo from "@/assets/clubs/sc.png";

const clubLogos: Record<string, string> = {
  PSG: psgLogo,
  OM: omLogo,
  BAY: bayLogo,
  BAR: barLogo,
  LIV: livLogo,
  MCI: mciLogo,
  INT: intLogo,
  // SA Football
  KC: kcLogo,
  OP: opLogo,
  SUN: sunLogo,
  SSU: ssuLogo,
  AMA: amaLogo,
  RAM: ramLogo,
  CTC: ctcLogo,
  SFC: sfcLogo,
  CHI: chiLogo,
  TSG: tsgLogo,
  // SA Cricket
  JSK: jskLogo,
  PR: prLogo,
  MICT: mictLogo,
  DSG: dsgLogo,
  SA: saLogo,
  IND: indLogo,
  TIT: titLogo,
  DOL: dolLogo,
  MI: miLogo,
  CSK: cskLogo,
  // SA Rugby
  STO: stoLogo,
  BUL: bulLogo,
  LIO: lioLogo,
  SHA: shaLogo,
  WP: stoLogo,  // Western Province = Stormers
  BB: bulLogo,  // Blue Bulls = Bulls
  // Horse Racing Tracks
  TF: tfLogo,
  KW: kwLogo,
  GV: gvLogo,
  SC: scLogo,
  R5: tfLogo,
  R6: tfLogo,
  R3: scLogo,
  R1: kwLogo,
  GC: gvLogo,
  MET: kwLogo,
};

const fallbackColors: Record<string, { bg: string; text: string }> = {
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
