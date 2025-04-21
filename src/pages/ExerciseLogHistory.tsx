import { useState, useEffect, useMemo } from 'react';
import { Loader2, Calendar, Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/logs');
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }
        const data = await response.json();
        // Validate and transform the data
        const validLogs = Array.isArray(data) ? data.filter((log): log is Log => {
          return log && 
            typeof log._id === 'string' &&
            typeof log.exerciseName === 'string' &&
            typeof log.date === 'string' &&
            Array.isArray(log.sets);
        }) : [];
        
        // Sort logs by date in descending order
        const sortedLogs = validLogs.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setLogs(sortedLogs);
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

  const uniqueExercises = useMemo(() => {
    const exercises = new Set(logs.map(log => log.exerciseName).filter(Boolean));
    return Array.from(exercises);
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (!log.exerciseName) return false;
      
      const matchesSearch = searchQuery ? 
        log.exerciseName.toLowerCase().includes(searchQuery.toLowerCase()) : 
        true;
      
      const matchesExercise = selectedExercise === 'all' || 
        log.exerciseName === selectedExercise;
      
      if (dateRange === 'all') return matchesSearch && matchesExercise;
      
      const logDate = new Date(log.date);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      
      if (dateRange === 'month') {
        return matchesSearch && matchesExercise && logDate >= thirtyDaysAgo;
      }
      
      return matchesSearch && matchesExercise;
    });
  }, [logs, searchQuery, selectedExercise, dateRange]);

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
      
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Exercise
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedExercise('all')}>
                All Exercises
              </DropdownMenuItem>
              {uniqueExercises.map((exercise) => (
                <DropdownMenuItem
                  key={exercise}
                  onClick={() => setSelectedExercise(exercise)}
                >
                  {exercise}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDateRange('all')}>
                All Time
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange('month')}>
                Last 30 Days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Logs Grid */}
      {filteredLogs.length === 0 ? (
        <div className="text-center text-muted-foreground p-8 bg-card rounded-lg border border-border">
          {searchQuery || selectedExercise !== 'all' || dateRange !== 'all' ? (
            'No matching exercise logs found. Try adjusting your filters.'
          ) : (
            'No exercise logs found. Start by logging some exercises!'
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredLogs.map((log) => (
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