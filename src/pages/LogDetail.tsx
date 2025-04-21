import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Dumbbell, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export const LogDetail = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState<Log | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/logs/${logId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch log details');
        }
        const data = await response.json();
        setLog(data);
        setError(null);
      } catch (error) {
        setError('Failed to load log details. Please try again later.');
        console.error('Error fetching log details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogDetail();
  }, [logId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !log) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error || 'Log not found'}
        </div>
      </div>
    );
  }

  // Calculate total volume (weight * reps for all sets)
  const totalVolume = log.sets.reduce((acc, set) => acc + (set.weight * set.reps), 0);
  // Calculate max weight
  const maxWeight = Math.max(...log.sets.map(set => set.weight));
  // Calculate total reps
  const totalReps = log.sets.reduce((acc, set) => acc + set.reps, 0);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to History
      </Button>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h1 className="text-2xl font-bold mb-2">{log.exerciseName}</h1>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(log.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Total Volume</h3>
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold mt-2">{totalVolume.toLocaleString()} lbs</p>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Max Weight</h3>
              <Dumbbell className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold mt-2">{maxWeight} lbs</p>
          </div>

          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Total Reps</h3>
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold mt-2">{totalReps}</p>
          </div>
        </div>

        {/* Sets Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">Set</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Weight (lbs)</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Reps</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Volume</th>
                </tr>
              </thead>
              <tbody>
                {log.sets.map((set) => (
                  <tr key={set.setNumber} className="border-b border-border last:border-0">
                    <td className="p-4">{set.setNumber}</td>
                    <td className="p-4">{set.weight}</td>
                    <td className="p-4">{set.reps}</td>
                    <td className="p-4">{set.weight * set.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}; 