import { useState } from "react";
import { useBetSlip } from "@/contexts/BetSlipContext";
import { X, Trash2 } from "lucide-react";
import TeamBadge from "@/components/TeamBadge";
import { Link } from "react-router-dom";

type PanelTab = "all" | "pending" | "settled" | "p2p";

const mockBetHistory = [
  {
    id: 1,
    team: "Manchester United",
    abbr: "MANU",
    type: "1x2",
    odds: 1.64,
    stake: 100,
    payout: 164,
    status: "won" as const,
    score: [
      { name: "Man United", abbr: "MANU", h1: 1, h2: 2 },
      { name: "Nott'm Forest", abbr: "NOTT", h1: 0, h2: 2 },
    ],
    date: "5/12/2026, 10:55 PM",
    id_short: "de7eb890-83d0...",
  },
  {
    id: 2,
    team: "Manchester City",
    abbr: "MANCI",
    type: "1x2",
    odds: 1.21,
    stake: 100,
    payout: 121,
    status: "won" as const,
    score: [
      { name: "Man City", abbr: "MANCI", h1: 2, h2: 1 },
      { name: "Crystal Palace", abbr: "CRPL", h1: 0, h2: 0 },
    ],
    date: "5/12/2026, 10:53 PM",
    id_short: "95bf1849-7dfe...",
  },
  {
    id: 3,
    team: "1:2 Correct Score",
    abbr: "1WIN",
    type: "Correct Match Score",
    odds: 2.70,
    stake: 200,
    payout: 0,
    status: "lost" as const,
    score: null,
    date: "7 May, 2:04 PM",
    id_short: "Team Nemesis",
  },
];

const STATUS_STYLES = {
  won: { bg: "hsl(var(--success) / 0.2)", color: "hsl(var(--success))", label: "WON" },
  lost: { bg: "hsl(var(--destructive) / 0.2)", color: "hsl(var(--destructive))", label: "LOST" },
  pending: { bg: "hsl(var(--live) / 0.2)", color: "hsl(var(--live))", label: "PENDING" },
};

const DesktopBetsPanel = () => {
  const [activeTab, setActiveTab] = useState<PanelTab>("all");
  const { selections, removeSelection, clearSelections } = useBetSlip();

  const TABS: { key: PanelTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "settled", label: "Settled" },
    { key: "p2p", label: "P2P Bets" },
  ];

  const filteredHistory =
    activeTab === "all"
      ? mockBetHistory
      : activeTab === "pending"
      ? mockBetHistory.filter((b) => b.status === "pending")
      : activeTab === "settled"
      ? mockBetHistory.filter((b) => b.status !== "pending")
      : [];

  return (
    <aside
      className="flex flex-col h-full overflow-hidden border-l"
      style={{
        background: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
      }}
    >
      {/* Header */}
      <div
        className="px-4 pt-3 pb-0 border-b flex-shrink-0"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <h3
          className="text-sm font-bold mb-3"
          style={{ color: "hsl(var(--foreground))", fontFamily: "var(--font-display)" }}
        >
          My Bets Panel
        </h3>
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="pb-2 px-2 text-xs font-bold border-b-2 transition-all mr-1"
              style={{
                borderBottomColor:
                  activeTab === tab.key ? "hsl(var(--primary))" : "transparent",
                color:
                  activeTab === tab.key
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active bet slip selections */}
      {selections.length > 0 && (
        <div
          className="px-3 py-2 border-b flex-shrink-0"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--primary) / 0.05)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-bold"
              style={{ color: "hsl(var(--primary))" }}
            >
              {selections.length} Selection{selections.length > 1 ? "s" : ""}
            </span>
            <button onClick={clearSelections}>
              <Trash2 size={13} style={{ color: "hsl(var(--muted-foreground))" }} />
            </button>
          </div>
          {selections.map((sel) => (
            <div
              key={sel.id}
              className="flex items-center justify-between py-1.5 px-2 mb-1 rounded-lg"
              style={{ background: "hsl(var(--muted))" }}
            >
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-[10px] font-semibold truncate" style={{ color: "hsl(var(--foreground))" }}>
                  {sel.match}
                </p>
                <p className="text-[9px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {sel.pick}
                </p>
              </div>
              <span
                className="text-xs font-bold mr-2"
                style={{ color: "hsl(var(--highlight))" }}
              >
                {sel.odds.toFixed(2)}
              </span>
              <button onClick={() => removeSelection(sel.id)}>
                <X size={12} style={{ color: "hsl(var(--muted-foreground))" }} />
              </button>
            </div>
          ))}
          <Link
            to="/betslip"
            className="block w-full text-center text-xs font-bold py-2 rounded-lg mt-2 transition-colors"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            Place Bet →
          </Link>
        </div>
      )}

      {/* Bet history list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredHistory.length === 0 && (
          <div
            className="text-center py-8 text-xs"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            No bets in this category
          </div>
        )}
        {filteredHistory.map((bet) => {
          const statusStyle = STATUS_STYLES[bet.status] || STATUS_STYLES.pending;
          return (
            <div
              key={bet.id}
              className="rounded-xl overflow-hidden border"
              style={{
                background: "hsl(var(--card-elevated))",
                borderColor: "hsl(var(--border))",
              }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <TeamBadge abbr={bet.abbr} />
                  <span
                    className="text-xs font-bold"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {bet.team}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "hsl(var(--highlight))" }}
                  >
                    {bet.odds.toFixed(2)}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{ background: statusStyle.bg, color: statusStyle.color }}
                  >
                    {statusStyle.label}
                  </span>
                </div>
              </div>
              <p
                className="text-[10px] px-3 pb-1.5"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {bet.type}
              </p>

              {/* Score breakdown */}
              {bet.score && (
                <div
                  className="mx-3 mb-2 rounded-lg overflow-hidden border"
                  style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted))" }}
                >
                  {bet.score.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-center px-2 py-1.5 ${i > 0 ? "border-t" : ""}`}
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      <TeamBadge abbr={row.abbr} size={18} />
                      <span
                        className="flex-1 text-[10px] font-semibold ml-2"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {row.name}
                      </span>
                      <div className="flex gap-2">
                        <span
                          className="w-5 text-center text-[10px] font-bold"
                          style={{ color: "hsl(var(--highlight))" }}
                        >
                          {row.h1}
                        </span>
                        <span
                          className="w-5 text-center text-[10px] font-bold"
                          style={{ color: "hsl(var(--highlight))" }}
                        >
                          {row.h2}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stakes */}
              <div
                className="flex justify-between px-3 py-2 border-t"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <div>
                  <p className="text-[9px] font-bold" style={{ color: "hsl(var(--muted-foreground))" }}>
                    STAKE
                  </p>
                  <p className="text-xs font-bold" style={{ color: "hsl(var(--foreground))" }}>
                    ₦ {bet.stake.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold" style={{ color: "hsl(var(--muted-foreground))" }}>
                    PAYOUT
                  </p>
                  <p
                    className="text-xs font-bold"
                    style={{
                      color: bet.payout > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))",
                    }}
                  >
                    ₦ {bet.payout.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Date/ID */}
              <div className="px-3 pb-2">
                <p className="text-[9px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {bet.id_short} · {bet.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DesktopBetsPanel;
