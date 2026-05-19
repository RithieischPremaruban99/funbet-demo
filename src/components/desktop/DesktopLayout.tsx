import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopTopBar from "./DesktopTopBar";
import DesktopSidebar from "./DesktopSidebar";
import DesktopSportsContent from "./DesktopSportsContent";
import DesktopBetsPanel from "./DesktopBetsPanel";

interface DesktopLayoutProps { children?: ReactNode; }

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const location = useLocation();
  const [activeSport, setActiveSport] = useState("Football");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "hsl(var(--background))" }}>
      <DesktopTopBar activePath={location.pathname} />
      <div style={{ display: "flex", marginTop: 80, height: "calc(100vh - 80px)", overflow: "hidden" }}>
        <div style={{ width: 210, flexShrink: 0, borderRight: "1px solid hsl(var(--border))", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <DesktopSidebar activeSport={activeSport} onSportChange={setActiveSport} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          {(location.pathname === "/sports" || location.pathname === "/home") ? (
            <DesktopSportsContent activeSport={activeSport} onSportChange={setActiveSport} />
          ) : (
            <div style={{ paddingTop: 16 }}>{children}</div>
          )}
        </div>
        <div style={{ width: 290, flexShrink: 0, borderLeft: "1px solid hsl(var(--border))", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <DesktopBetsPanel />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
