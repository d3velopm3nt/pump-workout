import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Trophy,
  ArrowLeft,
  Target,
  Dumbbell,
  Timer,
  Flame,
  TrendingUp,
  Award
} from 'lucide-react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { Button } from '@/components/ui/button';

interface Set {
  weight: number;
  reps: number;
}

export const ExerciseLogPage = () => {
  const { id } = useParams<{ id: string }>();
  const decodedExerciseName = id ? decodeURIComponent(id) : '';
  const [sets, setSets] = useState<Set[]>([{ weight: 0, reps: 0 }]);
  
  // Mock data for gamification elements
  const exerciseStats = {
    personalBest: 225,
    lastWeight: 205,
    totalVolume: 12500,
    completions: 45,
    xpReward: 50,
    streakDays: 3
  };

  const trainingZones = [
    { name: 'Strength', reps: '1-5', intensity: '85-100%', xpMultiplier: 1.5 },
    { name: 'Hypertrophy', reps: '6-12', intensity: '65-85%', xpMultiplier: 1.2 },
    { name: 'Endurance', reps: '12+', intensity: '50-65%', xpMultiplier: 1.0 }
  ];

  const addSet = () => {
    setSets([...sets, { weight: sets[sets.length - 1].weight, reps: 0 }]);
  };

  const updateSet = (index: number, field: keyof Set, value: number) => {
    // Prevent negative values
    if (value < 0) return;
    
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6">
      <Link to=".." className="btn btn-ghost gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to exercise
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main logging section */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-6">
                <GiWeightLiftingUp className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold">Log {decodedExerciseName}</h1>
              </div>

              {/* Sets logging */}
              <div className="space-y-4">
                {sets.map((set, index) => (
                  <div key={index} className="card bg-base-300 p-4">
                    <div className="flex items-center gap-4">
                      <div className="badge badge-primary">Set {index + 1}</div>
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div>
                          <label className="label">Weight</label>
                          <input
                            type="number"
                            min="0"
                            className="input input-bordered w-full"
                            value={set.weight}
                            onChange={(e) => updateSet(index, 'weight', Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="label">Reps</label>
                          <input
                            type="number"
                            min="0"
                            className="input input-bordered w-full"
                            value={set.reps}
                            onChange={(e) => updateSet(index, 'reps', Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSet(index)}
                        className="text-error"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                <Button onClick={addSet} className="w-full">
                  Add Set
                </Button>
              </div>

              <div className="mt-6">
                <Button className="w-full btn-primary">
                  Complete Workout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Training Zones */}
        <div className="space-y-6">
          {/* Exercise Stats */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <Trophy className="h-5 w-5 text-warning" />
                Exercise Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="stat bg-base-300 rounded-box p-4">
                  <div className="stat-title">Personal Best</div>
                  <div className="stat-value text-primary">{exerciseStats.personalBest}lb</div>
                </div>
                <div className="stat bg-base-300 rounded-box p-4">
                  <div className="stat-title">Last Weight</div>
                  <div className="stat-value text-secondary">{exerciseStats.lastWeight}lb</div>
                </div>
                <div className="stat bg-base-300 rounded-box p-4">
                  <div className="stat-title">Total Volume</div>
                  <div className="stat-value text-accent">{exerciseStats.totalVolume}lb</div>
                </div>
                <div className="stat bg-base-300 rounded-box p-4">
                  <div className="stat-title">Completions</div>
                  <div className="stat-value">{exerciseStats.completions}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Zones */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <Target className="h-5 w-5 text-primary" />
                Training Zones
              </h2>
              <div className="space-y-4">
                {trainingZones.map((zone) => (
                  <div key={zone.name} className="card bg-base-300 p-4">
                    <div className="font-semibold text-primary">{zone.name}</div>
                    <div className="text-sm text-base-content/70">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Reps: {zone.reps}
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4" />
                        Intensity: {zone.intensity}
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-warning" />
                        XP Multiplier: {zone.xpMultiplier}x
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 