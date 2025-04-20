import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

interface ExerciseLog {
  id: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
}

export const ExerciseLogDetail = () => {
  const { exerciseId } = useParams();
  const [exerciseName, setExerciseName] = useState('');
  const [logs, setLogs] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    // TODO: Fetch exercise details and logs from your API
    const fetchExerciseDetails = async () => {
      try {
        const [exerciseResponse, logsResponse] = await Promise.all([
          fetch(`/api/exercises/${exerciseId}`),
          fetch(`/api/exercises/${exerciseId}/logs`)
        ]);
        
        const exerciseData = await exerciseResponse.json();
        const logsData = await logsResponse.json();
        
        setExerciseName(exerciseData.name);
        setLogs(logsData);
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    };

    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/log-history" className="text-primary hover:underline">
          ← Back to Exercise List
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">{exerciseName} - Log History</h1>
      
      <div className="grid gap-4">
        {logs.map((log) => (
          <Link
            key={log.id}
            to={`/log-history/${exerciseId}/${log.id}`}
            className="block p-4 rounded-lg bg-card hover:bg-card/90 transition-colors border border-border"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {format(new Date(log.date), 'MMMM d, yyyy')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {log.sets} sets • {log.reps} reps • {log.weight} kg
                </p>
              </div>
              <div className="text-primary">→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}; 