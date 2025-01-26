import React, { useEffect, useState } from 'react';

interface LeaderboardEntry {
  userId: string;
  username: string;
  level: number;
  experience: number;
}

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Fetch leaderboard data from your backend
    // This is where you'd make an API call
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Level</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.userId}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{entry.level}</td>
                <td>{entry.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 