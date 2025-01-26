export const ACHIEVEMENT_TYPES = {
  EXERCISE_COMPLETED: 'exercise_completed',
  STREAK_ACHIEVED: 'streak_achieved',
  LEVEL_REACHED: 'level_reached',
} as const;

export const EXPERIENCE_REWARDS = {
  EXERCISE_COMPLETION: 50,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 100,
} as const;

export const calculateExperience = (action: string, metadata?: any): number => {
  switch (action) {
    case 'exercise_completed':
      return EXPERIENCE_REWARDS.EXERCISE_COMPLETION;
    case 'daily_login':
      return EXPERIENCE_REWARDS.DAILY_LOGIN;
    case 'streak_bonus':
      return EXPERIENCE_REWARDS.STREAK_BONUS * (metadata?.streakDays || 1);
    default:
      return 0;
  }
};

export const checkAchievements = (
  action: string,
  currentProgress: any,
  metadata?: any
) => {
  const unlockedAchievements = [];
  
  // Add achievement checking logic here
  // Example:
  if (action === ACHIEVEMENT_TYPES.EXERCISE_COMPLETED) {
    if (currentProgress.exercisesCompleted >= 10) {
      unlockedAchievements.push('ACHIEVEMENT_10_EXERCISES');
    }
  }

  return unlockedAchievements;
}; 