import { useState } from 'react';
import { 
  Trophy, Medal, Star, Flame, Award, TrendingUp, 
  Crown, Calendar, Target, Dumbbell, ChevronRight,
  Clock, BarChart, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';
import { FaDumbbell, FaBolt, FaFire } from 'react-icons/fa';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
  maxProgress: number;
  completed: boolean;
  xpReward: number;
}

interface Exercise {
  name: string;
  lastPerformed: string;
  personalBest: number;
  progress: number;
  totalSets: number;
}

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'history'>('overview');

  // Mock user data
  const user = {
    name: "Alex Fitness",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
    level: 42,
    xp: 84200,
    nextLevelXp: 90000,
    streak: 15,
    achievements: 24,
    totalAchievements: 50,
    workoutsCompleted: 156,
    totalWorkoutTime: "128h 45m",
    weightLifted: "12,450 kg",
    joinDate: "2023-09-15",
    badges: ["Early Adopter", "Workout Warrior", "Strength Master"],
    stats: {
      strength: 85,
      endurance: 70,
      flexibility: 60,
      balance: 75
    }
  };

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Workout Warrior",
      description: "Complete 100 workouts",
      icon: <FaDumbbell className="w-6 h-6 text-primary" />,
      progress: 78,
      maxProgress: 100,
      completed: false,
      xpReward: 1000
    },
    // Add more achievements...
  ];

  // Mock exercise history
  const recentExercises: Exercise[] = [
    {
      name: "Bench Press",
      lastPerformed: "2 days ago",
      personalBest: 100,
      progress: 85,
      totalSets: 24
    },
    // Add more exercises...
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-base-200 rounded-box p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} alt={user.name} />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.badges.map((badge) => (
                <div key={badge} className="badge badge-primary badge-outline">
                  {badge}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Joined {new Date(user.joinDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-error" />
                {user.streak} day streak
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-warning" />
                {user.achievements}/{user.totalAchievements} achievements
              </div>
            </div>
          </div>

          <div className="stats bg-base-300 shadow">
            <div className="stat">
              <div className="stat-title">Current Level</div>
              <div className="stat-value text-primary">{user.level}</div>
              <div className="stat-desc">
                {user.xp.toLocaleString()}/{user.nextLevelXp.toLocaleString()} XP
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <progress 
            className="progress progress-primary w-full" 
            value={user.xp % 5000} 
            max="5000"
          />
          <div className="flex justify-between text-sm text-base-content/70">
            <span>Level {user.level}</span>
            <span>Level {user.level + 1}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button 
          className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'achievements' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Exercise History
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Stats Cards */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <BarChart className="w-5 h-5 text-primary" />
                Training Stats
              </h2>
              <div className="grid gap-4">
                {Object.entries(user.stats).map(([stat, value]) => (
                  <div key={stat} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="capitalize">{stat}</span>
                      <span className="text-primary">{value}%</span>
                    </div>
                    <progress 
                      className="progress progress-primary" 
                      value={value} 
                      max="100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workout Summary */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <GiMuscleUp className="w-5 h-5 text-primary" />
                Workout Summary
              </h2>
              <div className="stats stats-vertical shadow">
                <div className="stat">
                  <div className="stat-title">Total Workouts</div>
                  <div className="stat-value text-primary">{user.workoutsCompleted}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Time Spent</div>
                  <div className="stat-value text-secondary">{user.totalWorkoutTime}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Weight Lifted</div>
                  <div className="stat-value text-accent">{user.weightLifted}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`card bg-base-200 ${achievement.completed ? 'border-2 border-primary' : ''}`}
            >
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="card-title flex items-center gap-2">
                      {achievement.icon}
                      {achievement.title}
                    </h3>
                    <p className="text-base-content/70">{achievement.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="badge badge-primary">
                      {achievement.xpReward} XP
                    </div>
                    {achievement.completed && (
                      <div className="badge badge-success mt-2">Completed</div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <progress 
                    className="progress progress-primary w-full" 
                    value={achievement.progress} 
                    max={achievement.maxProgress}
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                    <span>{Math.round((achievement.progress/achievement.maxProgress) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Exercise History Tab */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-200 rounded-box p-4"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Last Performed</th>
                  <th>Personal Best</th>
                  <th>Progress</th>
                  <th>Total Sets</th>
                </tr>
              </thead>
              <tbody>
                {recentExercises.map((exercise) => (
                  <tr key={exercise.name} className="hover:bg-base-300 cursor-pointer">
                    <td>
                      <div className="flex items-center gap-2">
                        <GiWeightLiftingUp className="w-5 h-5 text-primary" />
                        {exercise.name}
                      </div>
                    </td>
                    <td>{exercise.lastPerformed}</td>
                    <td>{exercise.personalBest} kg</td>
                    <td>
                      <progress 
                        className="progress progress-primary w-24" 
                        value={exercise.progress} 
                        max="100"
                      />
                    </td>
                    <td>{exercise.totalSets} sets</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 