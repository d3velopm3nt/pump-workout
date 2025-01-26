import { useState } from 'react';
import { Trophy, Medal, Star, Flame, Award, TrendingUp, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  achievements: number;
  rank: number;
  progress: number;
  weeklyGain: number;
}

export const Leaderboard = () => {
  // Mock data - replace with real data from your backend
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [users] = useState<LeaderboardUser[]>([
    {
      id: 1,
      name: "Alex Fitness",
      avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
      level: 42,
      xp: 84200,
      streak: 15,
      achievements: 24,
      rank: 1,
      progress: 75,
      weeklyGain: 2
    },
    // Add more mock users here
  ]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-400";
      case 3: return "text-amber-600";
      default: return "text-primary";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Star className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary" />
          Leaderboard
        </h1>
        
        <div className="join">
          {(['weekly', 'monthly', 'allTime'] as const).map((frame) => (
            <button
              key={frame}
              className={`join-item btn ${timeFrame === frame ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setTimeFrame(frame)}
            >
              {frame.charAt(0).toUpperCase() + frame.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="stat-title">Total Players</div>
          <div className="stat-value text-primary">{users.length}</div>
          <div className="stat-desc">Active this {timeFrame}</div>
        </div>
        
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <Flame className="w-8 h-8" />
          </div>
          <div className="stat-title">Total XP Earned</div>
          <div className="stat-value text-primary">
            {users.reduce((acc, user) => acc + user.xp, 0).toLocaleString()}
          </div>
          <div className="stat-desc">Across all players</div>
        </div>

        <div className="stat bg-base-200 rounded-box">
          <div className="stat-figure text-primary">
            <Award className="w-8 h-8" />
          </div>
          <div className="stat-title">Achievements Unlocked</div>
          <div className="stat-value text-primary">
            {users.reduce((acc, user) => acc + user.achievements, 0)}
          </div>
          <div className="stat-desc">Community total</div>
        </div>
      </div>

      <div className="bg-base-200 rounded-box p-4">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Level</th>
                <th>XP</th>
                <th>Streak</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-base-300 cursor-pointer"
                >
                  <td className="flex items-center gap-2">
                    <span className={`font-bold ${getRankColor(user.rank)}`}>
                      {getRankIcon(user.rank)}
                      #{user.rank}
                    </span>
                    {user.weeklyGain > 0 && (
                      <span className="badge badge-success badge-sm">
                        +{user.weeklyGain}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                          <img src={user.avatar} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">
                          {user.achievements} achievements
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-primary badge-lg">
                      Lvl {user.level}
                    </div>
                  </td>
                  <td>{user.xp.toLocaleString()} XP</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-error" />
                      {user.streak} days
                    </div>
                  </td>
                  <td>
                    <div className="w-full">
                      <progress
                        className="progress progress-primary w-full"
                        value={user.progress}
                        max="100"
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 