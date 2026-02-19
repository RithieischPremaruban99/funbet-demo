import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Flame, Trophy, Dices, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchableItem {
  id: number;
  type: string;
  label: string;
  sublabel: string;
  link: string;
  live?: boolean;
}

const searchableMatches: SearchableItem[] = [
  { id: 1, type: "match", label: "Paris SG vs Olympique Lyonnais", sublabel: "Ligue 1 - LIVE", link: "/sports", live: true },
  { id: 2, type: "match", label: "RC Lens vs AS Monaco", sublabel: "Ligue 1 - LIVE", link: "/sports", live: true },
  { id: 3, type: "match", label: "LOSC Lille vs OGC Nice", sublabel: "Ligue 1 - LIVE", link: "/sports", live: true },
  { id: 4, type: "match", label: "FC Bayern vs FC Barcelona", sublabel: "Champions League - TODAY 20:00", link: "/sports", live: false },
  { id: 5, type: "match", label: "FC Barcelona vs Inter Milan", sublabel: "Champions League - TOMORROW 21:00", link: "/sports", live: false },
  { id: 6, type: "match", label: "Olympique Marseille vs AS Monaco", sublabel: "Ligue 1 - SAT 17:00", link: "/sports", live: false },
  { id: 7, type: "match", label: "Liverpool FC vs Manchester City", sublabel: "Premier League - SUN 16:00", link: "/sports", live: false },
  { id: 8, type: "match", label: "LA Lakers vs Boston Celtics", sublabel: "NBA - LIVE", link: "/sports", live: true },
  { id: 9, type: "match", label: "Golden State vs Milwaukee Bucks", sublabel: "NBA - LIVE", link: "/sports", live: true },
  { id: 10, type: "match", label: "C. Alcaraz vs N. Djokovic", sublabel: "ATP Masters 1000 - LIVE", link: "/sports", live: true },
  { id: 11, type: "match", label: "TP Mazembe vs AS Vita", sublabel: "Linafoot", link: "/sports", live: false },
  { id: 12, type: "match", label: "DR Congo vs Zambia", sublabel: "CAN Qualifiers", link: "/sports", live: false },
  { id: 13, type: "match", label: "DCMP vs FC Lupopo", sublabel: "Linafoot", link: "/sports", live: false },
];

const searchableGames: SearchableItem[] = [
  { id: 101, type: "game", label: "Roulette VIP", sublabel: "Live • ⭐ 4.8", link: "/casino" },
  { id: 102, type: "game", label: "Golden Slots", sublabel: "Slots • ⭐ 4.5", link: "/casino" },
  { id: 103, type: "game", label: "Blackjack Pro", sublabel: "Table • ⭐ 4.9", link: "/casino" },
  { id: 104, type: "game", label: "Mega Fortune", sublabel: "Jackpot • ⭐ 4.3", link: "/casino" },
  { id: 105, type: "game", label: "Baccarat Elite", sublabel: "Live • ⭐ 4.7", link: "/casino" },
  { id: 106, type: "game", label: "Texas Hold'em", sublabel: "Table • ⭐ 4.6", link: "/casino" },
  { id: 107, type: "game", label: "Crash Game", sublabel: "Crash • 🚀", link: "/casino" },
];

const searchableUsers: SearchableItem[] = [
  { id: 201, type: "user", label: "Serge T.", sublabel: "#1 • Win Rate 78%", link: "/profile/serge-t" },
  { id: 202, type: "user", label: "Gloire M.", sublabel: "#2 • Win Rate 72%", link: "/profile/gloire-m" },
  { id: 203, type: "user", label: "Rachel B.", sublabel: "#3 • Win Rate 69%", link: "/profile/rachel-b" },
  { id: 204, type: "user", label: "Patrice M.", sublabel: "Verified • TP Mazembe Fan", link: "/profile/patrice-m" },
  { id: 205, type: "user", label: "Aimée K.", sublabel: "Win Rate 71%", link: "/profile/aimee-k" },
  { id: 206, type: "user", label: "David N.", sublabel: "Verified • Football Analyst", link: "/profile/david-n" },
];

const allItems: SearchableItem[] = [...searchableMatches, ...searchableGames, ...searchableUsers];
const popularSearches: string[] = ["TP Mazembe", "Paris SG", "Crash", "Roulette", "Serge T."];

interface GlobalSearchProps { isOpen: boolean; onClose: () => void; }

const CategoryIcon = ({ type }: { type: string }) => {
  if (type === "match") return <Flame size={14} className="text-live" />;
  if (type === "game") return <Dices size={14} className="text-highlight" />;
  if (type === "user") return <Users size={14} className="text-primary" />;
  return null;
};

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 100); else setQuery(""); }, [isOpen]);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);

  const results = query.trim().length > 0 ? allItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()) || item.sublabel.toLowerCase().includes(query.toLowerCase())).slice(0, 12) : [];
  const matchResults = results.filter((r) => r.type === "match");
  const gameResults = results.filter((r) => r.type === "game");
  const userResults = results.filter((r) => r.type === "user");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[100] bg-background" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className="flex items-center gap-2 px-4 h-14 border-b border-border">
            <Search size={18} className="text-muted-foreground flex-shrink-0" />
            <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Matches, games, players..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" autoComplete="off" />
            {query && <button onClick={() => setQuery("")} className="p-1"><X size={16} className="text-muted-foreground" /></button>}
            <button onClick={onClose} className="text-sm text-primary font-semibold ml-1">Close</button>
          </div>

          <div className="overflow-auto max-h-[calc(100vh-56px)] px-4 py-3">
            {query.trim().length === 0 && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button key={term} onClick={() => setQuery(term)} className="px-3 py-1.5 rounded-full bg-card-elevated border border-border text-xs font-medium text-foreground hover:border-primary/40 transition-colors">{term}</button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold mt-5 mb-2">Quick Access</p>
                <div className="space-y-1">
                  {[
                    { icon: Flame, label: "Live Matches", link: "/sports", color: "text-live" },
                    { icon: Dices, label: "Casino & Crash", link: "/casino", color: "text-highlight" },
                    { icon: Trophy, label: "Leaderboard", link: "/social", color: "text-primary" },
                    { icon: Users, label: "Community", link: "/social", color: "text-primary" },
                  ].map((item) => { const Icon = item.icon; return (
                    <Link key={item.label} to={item.link} onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-card-elevated transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-card-elevated border border-border flex items-center justify-center"><Icon size={14} className={item.color} /></div>
                      <span className="text-sm font-medium">{item.label}</span>
                      <ArrowRight size={14} className="text-muted-foreground ml-auto" />
                    </Link>
                  ); })}
                </div>
              </div>
            )}

            {query.trim().length > 0 && results.length === 0 && (
              <div className="text-center py-12">
                <Search size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">No results for "{query}"</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}

            {matchResults.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Matches ({matchResults.length})</p>
                <div className="space-y-1">
                  {matchResults.map((item) => (
                    <Link key={item.id} to={item.link} onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-card-elevated transition-colors">
                      <CategoryIcon type={item.type} />
                      <div className="flex-1 min-w-0"><p className="text-xs font-semibold truncate">{item.label}</p><p className="text-[10px] text-muted-foreground">{item.sublabel}</p></div>
                      {"live" in item && item.live && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-live/20 text-live font-bold">LIVE</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {gameResults.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Games ({gameResults.length})</p>
                <div className="space-y-1">
                  {gameResults.map((item) => (
                    <Link key={item.id} to={item.link} onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-card-elevated transition-colors">
                      <CategoryIcon type={item.type} />
                      <div className="flex-1 min-w-0"><p className="text-xs font-semibold truncate">{item.label}</p><p className="text-[10px] text-muted-foreground">{item.sublabel}</p></div>
                      <Star size={12} className="text-highlight fill-highlight" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {userResults.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Players ({userResults.length})</p>
                <div className="space-y-1">
                  {userResults.map((item) => (
                    <Link key={item.id} to={item.link} onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-card-elevated transition-colors">
                      <div className="w-7 h-7 rounded-full bg-card-elevated border border-border flex items-center justify-center text-[9px] font-bold">{item.label.split(" ").map(w => w[0]).join("")}</div>
                      <div className="flex-1 min-w-0"><p className="text-xs font-semibold truncate">{item.label}</p><p className="text-[10px] text-muted-foreground">{item.sublabel}</p></div>
                      <ArrowRight size={14} className="text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
