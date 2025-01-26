import React from 'react';
import { useGamification } from '../../contexts/GamificationContext';

export const Achievements: React.FC = () => {
  const { userProgress } = useGamification();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userProgress.achievements.map((achievement) => (
          <div key={achievement.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{achievement.name}</h3>
              <p>{achievement.description}</p>
              <progress 
                className={`progress ${achievement.completed ? 'progress-success' : 'progress-primary'}`}
                value={(achievement.progress / achievement.target) * 100} 
                max="100"
              />
              <p className="text-sm mt-1">
                {achievement.progress} / {achievement.target}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 