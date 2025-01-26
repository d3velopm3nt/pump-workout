import { useLocation, Link } from 'react-router-dom';
import { getMuscles } from '../../config/exercises';
import { ChevronRight, Trophy, Star, Clock } from 'lucide-react';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';
import { FaDumbbell, FaFire, FaBolt } from 'react-icons/fa';

export const ExerciseList = () => {
  const location = useLocation();
  const { section, group } = location.state || {};
  
  // Add error handling for getMuscles
  let muscles: any[] = [];
  try {
    muscles = getMuscles(section as "Upper" | "Lower", group || "") || [];
  } catch (error) {
    console.error('Error loading muscles:', error);
  }

  // Mock data for gamification elements
  const getExerciseStats = (exercise: string) => ({
    personalBest: Math.floor(Math.random() * 200) + 50,
    completions: Math.floor(Math.random() * 100),
    xpReward: Math.floor(Math.random() * 50) + 10,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-success';
      case 'Intermediate':
        return 'text-warning';
      case 'Advanced':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  if (!muscles.length) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-lg">Muscle group not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li><Link to="/">Body Sections</Link></li>
              <li>{section}</li>
              <li className="text-primary">{group}</li>
            </ul>
          </div>
          <h1 className="text-3xl font-bold mt-2 flex items-center gap-3">
            <GiMuscleUp className="w-8 h-8 text-primary" />
            {group} Exercises
          </h1>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Available Exercises</div>
            <div className="stat-value text-primary">
              {muscles.reduce((acc, m) => acc + m.exercises.length, 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {muscles.map((muscle) => (
          <div key={muscle.name} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <GiWeightLiftingUp className="w-6 h-6 text-primary" />
                <h2 className="card-title flex-1">
                  {muscle.common}
                  <span className="text-sm text-base-content/60 block">
                    {muscle.name}
                  </span>
                </h2>
              </div>
              
              <div className="space-y-4">
                {muscle.exercises.map((exercise: string) => {
                  const stats = getExerciseStats(exercise);
                  return (
                    <Link
                      key={exercise}
                      to={`/exercise/${encodeURIComponent(exercise)}`}
                      className="block bg-base-300 rounded-lg p-4 hover:bg-base-100 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <FaDumbbell className="h-5 w-5 text-primary" />
                            <span className="font-semibold">{exercise}</span>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                              <Trophy className="w-4 h-4 text-warning" />
                              <span>PB: {stats.personalBest}lbs</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                              <Clock className="w-4 h-4 text-info" />
                              <span>{stats.completions} completions</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className={`badge ${getDifficultyColor(stats.difficulty)}`}>
                            {stats.difficulty}
                          </div>
                          <div className="flex items-center gap-1 text-warning text-sm">
                            <FaBolt />
                            <span>{stats.xpReward} XP</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-2">
                        <span className="text-primary text-sm flex items-center gap-1">
                          Start Exercise <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 