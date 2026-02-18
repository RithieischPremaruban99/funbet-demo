import { createContext, useContext, useState, ReactNode } from "react";

interface FollowContextType {
  followedUsers: Set<string>;
  toggleFollow: (slug: string) => void;
  isFollowing: (slug: string) => boolean;
  followCount: number;
  isProfilePrivate: boolean;
  toggleProfilePrivacy: () => void;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const FollowProvider = ({ children }: { children: ReactNode }) => {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(
    () => new Set(["serge-t", "aimee-k"])
  );
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);

  const toggleFollow = (slug: string) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const isFollowing = (slug: string) => followedUsers.has(slug);
  const toggleProfilePrivacy = () => setIsProfilePrivate((p) => !p);

  return (
    <FollowContext.Provider value={{ followedUsers, toggleFollow, isFollowing, followCount: followedUsers.size, isProfilePrivate, toggleProfilePrivacy }}>
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) throw new Error("useFollow must be used within FollowProvider");
  return context;
};
