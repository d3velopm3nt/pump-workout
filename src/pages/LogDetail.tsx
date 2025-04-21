import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

interface LogSet {
  setNumber: number;
  weight: number;
  reps: number;
}

interface Log {
  _id: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  userId: string;
  sets: LogSet[];
  createdAt: string;
  updatedAt: string;
}

export const LogDetail = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState<Log | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogDetail = async () => {
      if (!logId) {
        setError('No log ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/logs/${logId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch log details: ${response.status}`);
        }

        const data = await response.json();
        
        // The API returns an array with a single log object
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid response format: expected an array with a log object');
        }

        const logData = data[0]; // Get the first (and should be only) log object

        if (!logData || !logData.sets || !Array.isArray(logData.sets)) {
          throw new Error('Invalid log data format: missing or invalid sets array');
        }

        setLog(logData);
        setError(null);
      } catch (error) {
        console.error('Error fetching log:', error);
        setError(error instanceof Error ? error.message : 'Failed to load log details');
        setLog(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogDetail();
  }, [logId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Button>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !log) {
    return (
      <div className="container mx-auto p-4">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Button>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error || 'Log not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to History
      </Button>

      <div className="space-y-4">
        {/* Exercise Name and Date */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h1 className="text-xl font-semibold">{log.exerciseName}</h1>
          <p className="text-muted-foreground mt-1">
            {new Date(log.date).toLocaleDateString()}
          </p>
        </div>

        {/* Sets */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Sets</h2>
          </div>
          <div className="divide-y divide-border">
            {log.sets.map((set) => (
              <div key={set.setNumber} className="p-4 flex justify-between items-center">
                <div>
                  <span className="text-muted-foreground">Set {set.setNumber}</span>
                </div>
                <div className="flex gap-8">
                  <div>
                    <span className="text-muted-foreground mr-2">Weight:</span>
                    <span className="font-medium">{set.weight} lbs</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground mr-2">Reps:</span>
                    <span className="font-medium">{set.reps}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 