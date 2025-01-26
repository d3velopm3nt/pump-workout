import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { INITIAL_ACHIEVEMENTS } from '../config/achievements';

interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  unlockedAt?: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

interface UserProgress {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  badges: Badge[];
  achievements: Achievement[];
}

interface GamificationContextType {
  userProgress: UserProgress;
  addExperience: (amount: number) => void;
  unlockBadge: (badgeId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    badges: [],
    achievements: INITIAL_ACHIEVEMENTS
  });

  useEffect(() => {
    if (user) {
      // Load user progress from backend
      // This is where you'd make an API call to fetch the user's progress
    }
  }, [user]);

  const calculateLevel = (exp: number): { level: number; expToNext: number } => {
    const baseExp = 100;
    const level = Math.floor(Math.sqrt(exp / baseExp)) + 1;
    const expToNext = Math.pow(level, 2) * baseExp - exp;
    return { level, expToNext };
  };

  const addExperience = (amount: number) => {
    setUserProgress(prev => {
      const newExp = prev.experience + amount;
      const { level, expToNext } = calculateLevel(newExp);
      
      return {
        ...prev,
        experience: newExp,
        level,
        experienceToNextLevel: expToNext
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setUserProgress(prev => ({
      ...prev,
      badges: prev.badges.map(badge =>
        badge.id === badgeId
          ? { ...badge, unlockedAt: new Date() }
          : badge
      )
    }));
  };

  const updateAchievementProgress = (achievementId: string, progress: number) => {
    setUserProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId
          ? {
              ...achievement,
              progress,
              completed: progress >= achievement.target
            }
          : achievement
      )
    }));
  };

  return (
    <GamificationContext.Provider
      value={{
        userProgress,
        addExperience,
        unlockBadge,
        updateAchievementProgress
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}; 