import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Clock, 
  Dumbbell, 
  Target, 
  Activity,
  Users
} from 'lucide-react';

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();

  // This would normally fetch from an API
  const { data: exercise, isLoading } = useQuery({
    queryKey: ['exercise', id],
    queryFn: async () => ({
      id,
      name: 'Bench Press',
      description: 'A compound exercise that primarily targets the chest muscles...',
      difficulty: 'intermediate' as const,
      environment: 'gym' as const,
      equipment: ['Barbell', 'Bench', 'Weight Plates'],
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      userSubmitted: false,
      votes: 245,
      variations: ['Close Grip', 'Wide Grip', 'Incline', 'Decline']
    })
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-lg">Exercise not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">{exercise.name}</h2>
          
          <div className="flex flex-wrap gap-4 my-4">
            <div className="badge badge-primary gap-2">
              <Target className="h-4 w-4" />
              {exercise.difficulty}
            </div>
            <div className="badge badge-secondary gap-2">
              <Dumbbell className="h-4 w-4" />
              {exercise.environment}
            </div>
            <div className="badge badge-accent gap-2">
              <Users className="h-4 w-4" />
              {exercise.votes} votes
            </div>
          </div>

          <p className="text-base-content/80 my-4">
            {exercise.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="card bg-base-300">
              <div className="card-body">
                <h3 className="card-title text-lg">Equipment Needed</h3>
                <ul className="list-disc list-inside">
                  {exercise.equipment.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card bg-base-300">
              <div className="card-body">
                <h3 className="card-title text-lg">Variations</h3>
                <ul className="list-disc list-inside">
                  {exercise.variations.map((variation) => (
                    <li key={variation}>{variation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 