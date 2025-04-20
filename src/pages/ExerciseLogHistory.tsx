import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Exercise } from '../types/exercise';
import { exerciseService } from '../services/exerciseService';
import { Loader2 } from 'lucide-react';

export const ExerciseLogHistory = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        const data = await exerciseService.getExercises();
        setExercises(data);
        setError(null);
      } catch (error) {
        setError('Failed to load exercises. Please try again later.');
        console.error('Error fetching exercises:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Exercise Log History</h1>
      {exercises.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No exercises found. Start by adding some exercises to your workout routine.
        </div>
      ) : (
        <div className="grid gap-4">
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              to={`/log-history/${exercise.id}`}
              className="block p-4 rounded-lg bg-card hover:bg-card/90 transition-colors border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl">💪</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{exercise.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.targetMuscles.join(', ')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}; 