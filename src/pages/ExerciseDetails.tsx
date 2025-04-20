import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { getExerciseById } from '../services/exerciseService';
import { GiMuscleUp } from 'react-icons/gi';
import { Button } from '../components/ui/button';

export function ExerciseDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: exercise, isLoading, error } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => getExerciseById(id!),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <h2 className="text-lg font-semibold text-destructive">Error loading exercise</h2>
          <p className="text-destructive">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto py-8 px-4">
        <Link to="/exercises" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Exercises
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <GiMuscleUp className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">{exercise?.name}</h1>
          </div>

          {/* Description */}
          <div className="card bg-card">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{exercise?.description}</p>
            </div>
          </div>

          {/* Muscles & Equipment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-card">
              <div className="card-body">
                <h2 className="text-xl font-semibold mb-4">Target Muscles</h2>
                <ul className="space-y-2">
                  {exercise?.muscles?.map((muscle) => (
                    <li key={muscle.name} className="flex items-center justify-between">
                      <span>{muscle.name}</span>
                      <span className="badge">{muscle.effectiveness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card bg-card">
              <div className="card-body">
                <h2 className="text-xl font-semibold mb-4">Required Equipment</h2>
                <ul className="space-y-2">
                  {exercise?.equipment?.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="card bg-card">
            <div className="card-body">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2">
                {exercise?.instructions?.map((instruction, index) => (
                  <li key={index} className="text-muted-foreground">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tips */}
          {exercise?.tips && exercise.tips.length > 0 && (
            <div className="card bg-card">
              <div className="card-body">
                <h2 className="text-xl font-semibold mb-4">Tips</h2>
                <ul className="list-disc list-inside space-y-2">
                  {exercise.tips.map((tip, index) => (
                    <li key={index} className="text-muted-foreground">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {exercise?.commonMistakes && exercise.commonMistakes.length > 0 && (
            <div className="card bg-card">
              <div className="card-body">
                <h2 className="text-xl font-semibold mb-4">Common Mistakes</h2>
                <ul className="list-disc list-inside space-y-2">
                  {exercise.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-muted-foreground">{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 