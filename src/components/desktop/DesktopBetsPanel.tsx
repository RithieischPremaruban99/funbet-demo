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
  {
    id: 4,
    team: "Arsenal vs Chelsea",
    abbr: "ARS",
    type: "1x2",
    odds: 1.85,
    stake: 150,
    payout: 0,
    status: "pending" as const,
    score: null,
    date: "12 May, 8:00 PM",
    id_short: "a1b2c3d4-5e6f...",
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
    <aside style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: "hsl(var(--card))" }}>
      {/* Header */}
      <div style={{ flexShrink: 0, padding: "12px 16px 0", borderBottom: "1px solid hsl(var(--border))" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "hsl(var(--foreground))", fontFamily: "var(--font-display)" }}>
          My Bets Panel
        </h3>
        <div style={{ display: "flex" }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                paddingBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 0,
                fontSize: 12,
                fontWeight: 700,
                borderBottom: `2px solid ${activeTab === tab.key ? "hsl(var(--primary))" : "transparent"}`,
                color: activeTab === tab.key ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.key ? "hsl(var(--primary))" : "transparent"}`,
                cursor: "pointer",
                marginRight: 4,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active bet slip selections */}
      {selections.length > 0 && (
        <div style={{ flexShrink: 0, padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--primary) / 0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(var(--primary))" }}>
              {selections.length} Selection{selections.length > 1 ? "s" : ""}
            </span>
            <button onClick={clearSelections} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Trash2 size={13} style={{ color: "hsl(var(--muted-foreground))" }} />
            </button>
          </div>
          {selections.map((sel) => (
            <div
              key={sel.id}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", marginBottom: 4, borderRadius: 8, background: "hsl(var(--muted))" }}
            >
              <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
                <p style={{ fontSize: 10, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "hsl(var(--foreground))", margin: 0 }}>
                  {sel.match}
                </p>
                <p style={{ fontSize: 9, color: "hsl(var(--muted-foreground))", margin: 0 }}>
                  {sel.pick}
                </p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, marginRight: 8, color: "hsl(var(--highlight))" }}>
                {sel.odds.toFixed(2)}
              </span>
              <button onClick={() => removeSelection(sel.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <X size={12} style={{ color: "hsl(var(--muted-foreground))" }} />
              </button>
            </div>
          ))}
          <Link
            to="/betslip"
            style={{ display: "block", width: "100%", textAlign: "center", fontSize: 12, fontWeight: 700, padding: "8px 0", borderRadius: 8, marginTop: 8, background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", textDecoration: "none" }}
          >
            Place Bet →
          </Link>
        </div>
      )}

      {/* Bet history list */}
      <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
        {filteredHistory.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32, fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            No bets in this category
          </div>
        )}
        {filteredHistory.map((bet) => {
          const statusStyle = STATUS_STYLES[bet.status] || STATUS_STYLES.pending;
          return (
            <div
              key={bet.id}
              style={{ borderRadius: 12, overflow: "hidden", border: "1px solid hsl(var(--border))", background: "hsl(var(--card-elevated))", marginBottom: 12 }}
            >
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 12px 4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <TeamBadge abbr={bet.abbr} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "hsl(var(--foreground))" }}>{bet.team}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--highlight))" }}>{bet.odds.toFixed(2)}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: statusStyle.bg, color: statusStyle.color }}>
                    {statusStyle.label}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 10, padding: "0 12px 6px", color: "hsl(var(--muted-foreground))", margin: 0 }}>{bet.type}</p>

              {/* Score breakdown */}
              {bet.score && (
                <div style={{ margin: "0 12px 8px", borderRadius: 8, overflow: "hidden", border: "1px solid hsl(var(--border))", background: "hsl(var(--muted))" }}>
                  {bet.score.map((row, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", padding: "6px 8px", borderTop: i > 0 ? "1px solid hsl(var(--border))" : "none" }}
                    >
                      <TeamBadge abbr={row.abbr} size={18} />
                      <span style={{ flex: 1, fontSize: 10, fontWeight: 600, marginLeft: 8, color: "hsl(var(--foreground))" }}>{row.name}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ width: 20, textAlign: "center", fontSize: 10, fontWeight: 700, color: "hsl(var(--highlight))" }}>{row.h1}</span>
                        <span style={{ width: 20, textAlign: "center", fontSize: 10, fontWeight: 700, color: "hsl(var(--highlight))" }}>{row.h2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stakes */}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderTop: "1px solid hsl(var(--border))" }}>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "hsl(var(--muted-foreground))", margin: 0 }}>STAKE</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "hsl(var(--foreground))", margin: 0 }}>₦ {bet.stake.toFixed(2)}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "hsl(var(--muted-foreground))", margin: 0 }}>PAYOUT</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: bet.payout > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))", margin: 0 }}>
                    ₦ {bet.payout.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Date/ID */}
              <div style={{ padding: "0 12px 8px" }}>
                <p style={{ fontSize: 9, color: "hsl(var(--muted-foreground))", margin: 0 }}>{bet.id_short} · {bet.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DesktopBetsPanel;
