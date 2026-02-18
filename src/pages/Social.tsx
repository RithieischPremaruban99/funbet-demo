import MobileLayout from "@/components/MobileLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Trophy, Swords, Users, Heart, MessageCircle, Share2,
  Send, Crown, Medal, Award, Flame, TrendingUp, Clock, ChevronRight,
  Smile, Image as ImageIcon, MoreHorizontal, Star, Zap, Target
} from "lucide-react";

// ─── Tab definitions ───
const socialTabs = [
  { id: "feed", label: "Feed", icon: MessageSquare },
  { id: "leaderboard", label: "Classement", icon: Trophy },
  { id: "challenges", label: "Défis", icon: Swords },
  { id: "chat", label: "Groupes", icon: Users },
] as const;

type TabId = (typeof socialTabs)[number]["id"];

// ─── Mock data ───
const feedPosts = [
  {
    id: 1, user: "Patrice M.", avatar: "PM", time: "il y a 5 min", verified: true,
    text: "🔥 TP Mazembe va gagner ce soir, j'en suis sûr! Cote 1.85 c'est du cadeau!",
    bet: { match: "TP Mazembe vs AS Vita", pick: "TP Mazembe", odds: "1.85", amount: "5,000 FC", status: "en cours" },
    likes: 42, comments: 12, shares: 5,
  },
  {
    id: 2, user: "Aimée K.", avatar: "AK", time: "il y a 18 min", verified: false,
    text: "Combo de 3 matchs validé hier soir! 💰 Les Léopards ne déçoivent jamais 🇨🇩",
    bet: null,
    result: { amount: "+25,000 FC", type: "win" },
    likes: 128, comments: 34, shares: 18,
  },
  {
    id: 3, user: "David N.", avatar: "DN", time: "il y a 32 min", verified: true,
    text: "Qui suit le match DCMP vs Lupopo? Le nul à 3.20 me tente bien...",
    bet: { match: "DCMP vs FC Lupopo", pick: "Nul", odds: "3.20", amount: "2,000 FC", status: "en cours" },
    likes: 21, comments: 8, shares: 2,
  },
];

const leaderboardUsers = [
  { rank: 1, name: "Serge T.", avatar: "ST", winRate: "78%", profit: "+420,000 FC", streak: 12, badge: "diamond" },
  { rank: 2, name: "Gloire M.", avatar: "GM", winRate: "72%", profit: "+315,000 FC", streak: 8, badge: "gold" },
  { rank: 3, name: "Rachel B.", avatar: "RB", winRate: "69%", profit: "+280,000 FC", streak: 6, badge: "gold" },
  { rank: 4, name: "Patrick K.", avatar: "PK", winRate: "65%", profit: "+195,000 FC", streak: 5, badge: "silver" },
  { rank: 5, name: "Esther L.", avatar: "EL", winRate: "63%", profit: "+170,000 FC", streak: 4, badge: "silver" },
  { rank: 6, name: "Christian W.", avatar: "CW", winRate: "61%", profit: "+145,000 FC", streak: 3, badge: "bronze" },
];

const challenges = [
  { id: 1, title: "Derby de Kinshasa", description: "TP Mazembe vs AS Vita – Qui gagne?", participants: 234, prize: "50,000 FC", deadline: "Ce soir 20h", hot: true },
  { id: 2, title: "Roi du Weekend", description: "Le meilleur combo de 3 matchs ce weekend", participants: 89, prize: "100,000 FC", deadline: "Dim 23h59", hot: false },
  { id: 3, title: "Chasseur de Cotes", description: "Trouvez la plus grosse cote gagnante", participants: 156, prize: "75,000 FC", deadline: "7 jours", hot: true },
];

const chatGroups = [
  { id: 1, name: "🇨🇩 Linafoot Fans", members: 1240, lastMessage: "Le match commence dans 30 min!", unread: 5, active: true },
  { id: 2, name: "⚽ Tipsters Pro", members: 456, lastMessage: "Mon pronostic pour demain...", unread: 12, active: true },
  { id: 3, name: "🏆 Champions League", members: 890, lastMessage: "Mazembe peut le faire!", unread: 0, active: false },
  { id: 4, name: "🎰 Casino & Slots", members: 320, lastMessage: "Jackpot gagné sur Mega Fortune!", unread: 3, active: true },
];

// ─── Subcomponents ───

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown size={18} className="text-highlight" />;
  if (rank === 2) return <Medal size={18} className="text-muted-foreground" />;
  if (rank === 3) return <Award size={18} className="text-primary" />;
  return <span className="text-sm font-bold text-muted-foreground w-[18px] text-center">{rank}</span>;
};

const FeedTab = () => (
  <div className="space-y-3">
    {/* Compose */}
    <div className="rounded-2xl border border-border card-gradient p-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full orange-gradient flex items-center justify-center text-xs font-bold text-highlight-foreground">
          Moi
        </div>
        <div className="flex-1 px-3 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-muted-foreground cursor-pointer">
          Partagez votre pronostic...
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex gap-3">
          <button className="flex items-center gap-1 text-muted-foreground"><ImageIcon size={14} /><span className="text-[10px]">Photo</span></button>
          <button className="flex items-center gap-1 text-muted-foreground"><Target size={14} /><span className="text-[10px]">Pari</span></button>
          <button className="flex items-center gap-1 text-muted-foreground"><Smile size={14} /><span className="text-[10px]">Emoji</span></button>
        </div>
        <motion.button
          className="px-4 py-1.5 rounded-full orange-gradient text-[11px] font-bold text-highlight-foreground"
          whileTap={{ scale: 0.95 }}
        >
          Publier
        </motion.button>
      </div>
    </div>

    {/* Posts */}
    {feedPosts.map((post, i) => (
      <motion.div
        key={post.id}
        className="rounded-2xl border border-border card-gradient overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08, duration: 0.35 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 pb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-card-elevated border border-border flex items-center justify-center text-[10px] font-bold text-foreground">
              {post.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold">{post.user}</span>
                {post.verified && <Star size={10} className="text-primary fill-primary" />}
              </div>
              <span className="text-[9px] text-muted-foreground">{post.time}</span>
            </div>
          </div>
          <button className="text-muted-foreground"><MoreHorizontal size={16} /></button>
        </div>

        {/* Content */}
        <p className="text-sm px-3 pt-2 pb-2 leading-relaxed">{post.text}</p>

        {/* Bet card */}
        {post.bet && (
          <div className="mx-3 mb-2 rounded-xl bg-card-elevated border border-primary/20 p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">{post.bet.match}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium">{post.bet.status}</span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs font-bold">{post.bet.pick}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-highlight">@{post.bet.odds}</span>
                <span className="text-[10px] text-muted-foreground">{post.bet.amount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Win result */}
        {post.result && (
          <div className="mx-3 mb-2 rounded-xl bg-success/10 border border-success/20 p-2.5 text-center">
            <span className="text-lg font-bold text-success">{post.result.amount}</span>
            <span className="text-[10px] text-success block">Pari gagné! 🎉</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-around py-2 px-3 border-t border-border/50">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Heart size={14} /><span className="text-[10px]">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle size={14} /><span className="text-[10px]">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Share2 size={14} /><span className="text-[10px]">{post.shares}</span>
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const LeaderboardTab = () => (
  <div className="space-y-3">
    {/* Time filter */}
    <div className="flex gap-2">
      {["Cette semaine", "Ce mois", "All-time"].map((period, i) => (
        <button
          key={period}
          className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
            i === 0 ? "orange-gradient text-highlight-foreground" : "bg-card-elevated border border-border text-muted-foreground"
          }`}
        >
          {period}
        </button>
      ))}
    </div>

    {/* Top 3 podium */}
    <div className="flex items-end justify-center gap-3 py-4">
      {[leaderboardUsers[1], leaderboardUsers[0], leaderboardUsers[2]].map((user, i) => {
        const heights = ["h-20", "h-28", "h-16"];
        const sizes = ["w-12 h-12", "w-16 h-16", "w-11 h-11"];
        const textSizes = ["text-xs", "text-sm", "text-[11px]"];
        return (
          <motion.div
            key={user.rank}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 200 }}
          >
            <div className={`${sizes[i]} rounded-full border-2 ${
              user.rank === 1 ? "border-yellow-400 glow-orange" : user.rank === 2 ? "border-gray-300" : "border-amber-600"
            } bg-card-elevated flex items-center justify-center font-bold ${textSizes[i]} mb-1`}>
              {user.avatar}
            </div>
            <RankBadge rank={user.rank} />
            <span className="text-[10px] font-bold mt-0.5">{user.name}</span>
            <span className="text-[9px] text-success font-semibold">{user.profit}</span>
            <div className={`${heights[i]} w-16 rounded-t-xl mt-1 ${
              user.rank === 1 ? "orange-gradient" : "bg-card-elevated border border-border"
            } flex items-end justify-center pb-1`}>
              <span className="text-[9px] font-bold text-muted-foreground">{user.winRate}</span>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Rest of ranking */}
    {leaderboardUsers.slice(3).map((user, i) => (
      <motion.div
        key={user.rank}
        className="flex items-center gap-3 p-3 rounded-2xl border border-border card-gradient"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + i * 0.06 }}
      >
        <RankBadge rank={user.rank} />
        <div className="w-9 h-9 rounded-full bg-card-elevated border border-border flex items-center justify-center text-[10px] font-bold">
          {user.avatar}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold">{user.name}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] text-muted-foreground">Win: {user.winRate}</span>
            <span className="text-[9px] text-muted-foreground">🔥 {user.streak}</span>
          </div>
        </div>
        <span className="text-xs font-bold text-success">{user.profit}</span>
      </motion.div>
    ))}
  </div>
);

const ChallengesTab = () => (
  <div className="space-y-3">
    {/* Active challenge banner */}
    <motion.div
      className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Swords size={28} className="mx-auto text-primary mb-2" />
      <h3 className="text-sm font-bold">Défis & Duels</h3>
      <p className="text-[10px] text-muted-foreground mt-1">Affrontez d'autres parieurs et gagnez des prix!</p>
      <motion.button
        className="mt-3 px-6 py-2 rounded-full orange-gradient text-xs font-bold text-highlight-foreground glow-orange"
        whileTap={{ scale: 0.95 }}
      >
        Créer un défi
      </motion.button>
    </motion.div>

    {/* Challenge cards */}
    {challenges.map((c, i) => (
      <motion.div
        key={c.id}
        className={`rounded-2xl border overflow-hidden card-gradient ${c.hot ? "border-primary/30" : "border-border"}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 + i * 0.08 }}
      >
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {c.hot && <Flame size={14} className="text-live" />}
              <span className="text-xs font-bold">{c.title}</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-card-elevated border border-border text-muted-foreground">
              <Clock size={9} className="inline mr-0.5" />{c.deadline}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">{c.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                <Users size={10} />{c.participants} joueurs
              </span>
              <span className="text-[10px] font-bold text-highlight flex items-center gap-1">
                <Zap size={10} />{c.prize}
              </span>
            </div>
            <motion.button
              className="px-3 py-1.5 rounded-full orange-gradient text-[10px] font-bold text-highlight-foreground"
              whileTap={{ scale: 0.95 }}
            >
              Participer
            </motion.button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ChatTab = () => (
  <div className="space-y-3">
    {/* Search */}
    <div className="relative">
      <input
        type="text"
        placeholder="Rechercher un groupe..."
        className="w-full px-4 py-2.5 rounded-xl bg-card-elevated border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
      />
    </div>

    {/* Groups */}
    {chatGroups.map((group, i) => (
      <motion.button
        key={group.id}
        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-border card-gradient text-left"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.06 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-11 h-11 rounded-full bg-card-elevated border border-border flex items-center justify-center text-lg flex-shrink-0">
          {group.name.split(" ")[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold truncate">{group.name}</span>
            {group.unread > 0 && (
              <span className="w-5 h-5 rounded-full orange-gradient flex items-center justify-center text-[9px] font-bold text-highlight-foreground flex-shrink-0">
                {group.unread}
              </span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">{group.lastMessage}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[9px] text-muted-foreground">{group.members} membres</span>
            {group.active && <span className="w-1.5 h-1.5 rounded-full bg-success" />}
          </div>
        </div>
        <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
      </motion.button>
    ))}

    {/* Create group */}
    <motion.button
      className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/40 transition-colors text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"
      whileTap={{ scale: 0.97 }}
    >
      <Users size={16} /> Créer un groupe
    </motion.button>
  </div>
);

// ─── Main component ───

const Social = () => {
  const [activeTab, setActiveTab] = useState<TabId>("feed");

  return (
    <MobileLayout>
      <motion.section
        className="px-4 mt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold">Communauté</h1>
            <p className="text-[10px] text-muted-foreground">Partagez, défiez, gagnez ensemble</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10 border border-success/20">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[9px] text-success font-semibold">1,247 en ligne</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-card-elevated border border-border mb-4">
          {socialTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-semibold transition-all ${
                  isActive ? "orange-gradient text-highlight-foreground glow-orange" : "text-muted-foreground"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={12} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="pb-6"
          >
            {activeTab === "feed" && <FeedTab />}
            {activeTab === "leaderboard" && <LeaderboardTab />}
            {activeTab === "challenges" && <ChallengesTab />}
            {activeTab === "chat" && <ChatTab />}
          </motion.div>
        </AnimatePresence>
      </motion.section>
    </MobileLayout>
  );
};

export default Social;
