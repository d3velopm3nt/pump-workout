import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Clock, 
  Dumbbell, 
  Target, 
  Activity,
  Users,
  ArrowLeft
} from 'lucide-react';

interface ExerciseDetails {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  environment: 'gym' | 'home' | 'both';
  equipment: string[];
  muscleGroups: string[];
  userSubmitted: boolean;
  votes: number;
  variations: string[];
}

export const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const decodedExerciseName = id ? decodeURIComponent(id) : '';

  const { data: exercise, isLoading } = useQuery<ExerciseDetails>({
    queryKey: ['exercise', decodedExerciseName],
    queryFn: async () => ({
      id: decodedExerciseName,
      name: decodedExerciseName,
      description: 'A compound exercise that targets multiple muscle groups. Proper form and technique are essential for maximum effectiveness and safety.',
      difficulty: 'intermediate',
      environment: 'gym',
      equipment: ['Barbell', 'Bench', 'Weight Plates', 'Safety Rack'],
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
      <Link to=".." className="btn btn-ghost gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to exercises
      </Link>

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