import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

interface LogEntry {
  id: string;
  date: string;
  sets: Array<{
    id: string;
    setNumber: number;
    weight: number;
    reps: number;
    notes?: string;
  }>;
  notes?: string;
}

export const LogEntryDetail = () => {
  const { exerciseId, logId } = useParams();
  const [exerciseName, setExerciseName] = useState('');
  const [logEntry, setLogEntry] = useState<LogEntry | null>(null);

  useEffect(() => {
    // TODO: Fetch exercise and log entry details from your API
    const fetchLogDetails = async () => {
      try {
        const [exerciseResponse, logResponse] = await Promise.all([
          fetch(`/api/exercises/${exerciseId}`),
          fetch(`/api/exercises/${exerciseId}/logs/${logId}`)
        ]);
        
        const exerciseData = await exerciseResponse.json();
        const logData = await logResponse.json();
        
        setExerciseName(exerciseData.name);
        setLogEntry(logData);
      } catch (error) {
        console.error('Error fetching log details:', error);
      }
    };

    fetchLogDetails();
  }, [exerciseId, logId]);

  if (!logEntry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to={`/log-history/${exerciseId}`} className="text-primary hover:underline">
          ← Back to {exerciseName} Logs
        </Link>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h1 className="text-2xl font-bold mb-2">
          {exerciseName} - {format(new Date(logEntry.date), 'MMMM d, yyyy')}
        </h1>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Sets</h2>
          <div className="grid gap-4">
            {logEntry.sets.map((set) => (
              <div
                key={set.id}
                className="p-4 rounded-lg bg-background border border-border"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">Set {set.setNumber}</div>
                  <div className="text-sm text-muted-foreground">
                    {set.weight} kg × {set.reps} reps
                  </div>
                </div>
                {set.notes && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Note: {set.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {logEntry.notes && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Session Notes</h2>
            <div className="p-4 rounded-lg bg-background border border-border">
              {logEntry.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 