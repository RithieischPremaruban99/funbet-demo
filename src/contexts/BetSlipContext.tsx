import React, { createContext, useContext, useState, useCallback } from "react";

export interface BetSelection {
  id: string;
  match: string;
  pick: string;
  odds: number;
  league: string;
  matchId: number;
}

interface BetSlipContextType {
  selections: BetSelection[];
  addSelection: (selection: BetSelection) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  isSelected: (id: string) => boolean;
  toggleSelection: (selection: BetSelection) => void;
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined);

export const BetSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selections, setSelections] = useState<BetSelection[]>([]);

  const addSelection = useCallback((selection: BetSelection) => {
    setSelections((prev) => {
      // Replace if same match already has a pick
      const filtered = prev.filter((s) => s.matchId !== selection.matchId);
      return [...filtered, selection];
    });
  }, []);

  const removeSelection = useCallback((id: string) => {
    setSelections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearSelections = useCallback(() => setSelections([]), []);

  const isSelected = useCallback(
    (id: string) => selections.some((s) => s.id === id),
    [selections]
  );

  const toggleSelection = useCallback((selection: BetSelection) => {
    setSelections((prev) => {
      const exists = prev.find((s) => s.id === selection.id);
      if (exists) return prev.filter((s) => s.id !== selection.id);
      // Replace if same match already has a pick
      const filtered = prev.filter((s) => s.matchId !== selection.matchId);
      return [...filtered, selection];
    });
  }, []);

  return (
    <BetSlipContext.Provider value={{ selections, addSelection, removeSelection, clearSelections, isSelected, toggleSelection }}>
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlip = () => {
  const ctx = useContext(BetSlipContext);
  if (!ctx) throw new Error("useBetSlip must be used within BetSlipProvider");
  return ctx;
};
