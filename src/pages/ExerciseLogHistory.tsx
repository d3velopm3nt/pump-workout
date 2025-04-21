import { useState, useEffect } from 'react';
import { Loader2, Calendar } from 'lucide-react';
interface LogSet {
  setNumber: number;
  weight: number;
  reps: number;
}

interface Log {
  _id: string;
  exerciseId: string;
  exerciseName: string;
  userId: string;
  date: string;
  sets: LogSet[];
}

export const ExerciseLogHistory = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/logs');
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }
        const data = await response.json();
        setLogs(data);
        setError(null);
      } catch (error) {
        setError('Failed to load exercise logs. Please try again later.');
        console.error('Error fetching logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleLogClick = (log: Log) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

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
      {logs.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No exercise logs found. Start by logging some exercises!
        </div>
      ) : (
        <div className="grid gap-4">
          {logs.map((log) => (
            <div
              key={log._id}
              onClick={() => handleLogClick(log)}
              className="block p-4 rounded-lg bg-card hover:bg-card/90 transition-colors border border-border cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{log.exerciseName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(log.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {log.sets.length} {log.sets.length === 1 ? 'set' : 'sets'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 