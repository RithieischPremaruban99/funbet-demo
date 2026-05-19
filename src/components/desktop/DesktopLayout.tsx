import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import DesktopTopBar from "./DesktopTopBar";
import DesktopSidebar from "./DesktopSidebar";
import DesktopSportsContent from "./DesktopSportsContent";
import DesktopBetsPanel from "./DesktopBetsPanel";

interface DesktopLayoutProps {
  children?: ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const location = useLocation();
  const [activeSport, setActiveSport] = useState("Football");

  return (
    <div style={{ height: "100vh", background: "hsl(var(--background))" }}>
      {/* Fixed Top Nav */}
      <DesktopTopBar activePath={location.pathname} />

      {/* 3-column layout below header */}
      <div
        style={{ marginTop: 56, height: "calc(100vh - 56px)", display: "flex", overflow: "hidden" }}
      >
        {/* LEFT SIDEBAR */}
        <div
          className="flex-shrink-0 overflow-hidden border-r"
          style={{
            width: 210,
            borderColor: "hsl(var(--border))",
          }}
        >
          <DesktopSidebar
            activeSport={activeSport}
            onSportChange={setActiveSport}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {/* Show sports content on /sports route, otherwise show children */}
          {location.pathname === "/sports" || location.pathname === "/home" ? (
            <DesktopSportsContent activeSport={activeSport} />
          ) : (
            <div className="pt-4">{children}</div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div
          className="flex-shrink-0 overflow-hidden border-l"
          style={{
            width: 290,
            borderColor: "hsl(var(--border))",
          }}
        >
          <DesktopBetsPanel />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
