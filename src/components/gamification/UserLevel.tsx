import React from 'react';
import { useGamification } from '../../contexts/GamificationContext';

export const UserLevel: React.FC = () => {
  const { userProgress } = useGamification();
  const { level, experience, experienceToNextLevel } = userProgress;

  return (
    <div className="user-level p-4">
      <div className="level-info">
        <span className="text-xl">Level {level}</span>
        <progress 
          className="progress progress-primary w-full"
          value={(experience / (experience + experienceToNextLevel)) * 100}
          max="100"
        />
        <span className="text-sm">
          {experience}/{experience + experienceToNextLevel} XP
        </span>
      </div>
    </div>
  );
}; 