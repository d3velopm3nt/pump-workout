import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Exercise } from '../types/exercise';

export const ExerciseLogHistory = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    // TODO: Fetch exercises from your API
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercises');
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Exercise Log History</h1>
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
                <p className="text-sm text-muted-foreground">{exercise.targetMuscles.join(', ')}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 