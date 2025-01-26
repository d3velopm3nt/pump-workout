import React from 'react';
import { FaDumbbell, FaFire, FaClock, FaTrophy, FaBolt, FaCalendar } from 'react-icons/fa';
import { GiMuscleUp, GiWeightLiftingUp, GiStopwatch } from 'react-icons/gi';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  reward: number;
  progress: number;
  target: number;
  endDate: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'daily' | 'weekly' | 'special';
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Power Hour',
    description: 'Complete 5 exercises in one session',
    icon: <GiMuscleUp className="w-8 h-8 text-primary" />,
    reward: 100,
    progress: 3,
    target: 5,
    endDate: new Date(Date.now() + 86400000), // 24 hours from now
    difficulty: 'easy',
    type: 'daily'
  },
  {
    id: '2',
    title: 'Weekly Warrior',
    description: 'Train for 5 days this week',
    icon: <FaFire className="w-8 h-8 text-error" />,
    reward: 300,
    progress: 3,
    target: 5,
    endDate: new Date(Date.now() + 604800000), // 7 days from now
    difficulty: 'medium',
    type: 'weekly'
  },
  {
    id: '3',
    title: 'Strength Master',
    description: 'Increase your max weight in any exercise',
    icon: <GiWeightLiftingUp className="w-8 h-8 text-success" />,
    reward: 200,
    progress: 0,
    target: 1,
    endDate: new Date(Date.now() + 86400000),
    difficulty: 'medium',
    type: 'daily'
  },
  {
    id: '4',
    title: 'Speed Demon',
    description: 'Complete a workout in under 30 minutes',
    icon: <GiStopwatch className="w-8 h-8 text-warning" />,
    reward: 150,
    progress: 0,
    target: 1,
    endDate: new Date(Date.now() + 86400000),
    difficulty: 'hard',
    type: 'daily'
  }
];

export const Challenges: React.FC = () => {
  const getDifficultyClass = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'border-l-4 border-success';
      case 'medium':
        return 'border-l-4 border-warning';
      case 'hard':
        return 'border-l-4 border-error';
      default:
        return '';
    }
  };

  const getTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Daily Challenges</h2>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Active Challenges</div>
            <div className="stat-value text-primary">{challenges.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-200 ${getDifficultyClass(
              challenge.difficulty
            )}`}
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="card-title flex items-center gap-2">
                    {challenge.icon}
                    {challenge.title}
                  </h3>
                  <p className="text-sm mt-2 text-base-content/80">{challenge.description}</p>
                </div>
                <div className="badge badge-outline">
                  {challenge.type}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.target}</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={(challenge.progress / challenge.target) * 100}
                  max="100"
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <FaBolt className="text-warning" />
                  <span className="text-warning font-semibold">{challenge.reward} XP</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaClock className="text-base-content/60" />
                  <span className="text-base-content/60">{getTimeRemaining(challenge.endDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider my-8">COMPLETED CHALLENGES</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
        {/* Add completed challenges here with a different style */}
      </div>
    </div>
  );
}; 