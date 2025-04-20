import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Exercise as ExerciseType } from '@/types/exercise';
import { Trash2 } from 'lucide-react';

interface Set {
  set: number;
  weight: string;
  unit: 'lbs' | 'kg';
  reps: string;
}

interface ExerciseLogProps {
  exercise: ExerciseType;
  onClose: () => void;
}

export const ExerciseLog: React.FC<ExerciseLogProps> = ({ exercise, onClose }) => {
  const [sets, setSets] = useState<Set[]>([{ set: 1, weight: '', unit: 'lbs', reps: '' }]);
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  const addSet = () => {
    setSets([...sets, { set: sets.length + 1, weight: '', unit: 'lbs', reps: '' }]);
  };

  const removeSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index).map((set, i) => ({
      ...set,
      set: i + 1,
    }));
    setSets(newSets);
  };

  const validateNumberInput = (value: string, isInteger: boolean = false): string => {
    // Remove any non-digit characters except decimal point
    let sanitized = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const decimalCount = (sanitized.match(/\./g) || []).length;
    if (decimalCount > 1) {
      const firstDecimal = sanitized.indexOf('.');
      sanitized = sanitized.slice(0, firstDecimal + 1) + 
                 sanitized.slice(firstDecimal + 1).replace(/\./g, '');
    }

    // For integer values (reps), remove decimal point and everything after it
    if (isInteger) {
      sanitized = sanitized.split('.')[0];
    }

    // Prevent leading zeros unless it's a decimal (e.g., 0.5)
    if (sanitized.length > 1 && sanitized[0] === '0' && sanitized[1] !== '.') {
      sanitized = sanitized.replace(/^0+/, '');
    }

    return sanitized;
  };

  const updateSet = (index: number, field: keyof Set, value: string) => {
    if (field === 'weight') {
      value = validateNumberInput(value, false); // Allow decimals for weight
      if (value && parseFloat(value) < 0) return;
    } else if (field === 'reps') {
      value = validateNumberInput(value, true); // Force integers for reps
      if (value && parseInt(value) < 0) return;
    }
    
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleSave = async () => {
    try {
      // Validate sets
      const invalidSets = sets.filter(set => {
        const weight = parseFloat(set.weight);
        const reps = parseInt(set.reps);
        return !set.weight || !set.reps || isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0;
      });

      if (invalidSets.length > 0) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all fields with valid numbers greater than 0',
          variant: 'destructive',
        });
        return;
      }

      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exerciseId: exercise._id,
          exerciseName: exercise.name,
          date: today,
          sets: sets.map(set => ({
            setNumber: set.set,
            weight: parseFloat(set.weight),
            unit: set.unit,
            reps: parseInt(set.reps),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save exercise log');
      }

      toast({
        title: 'Success',
        description: 'Exercise log saved successfully',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{exercise.name}</span>
          <span className="text-sm font-normal">{today}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Set</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set, index) => (
              <TableRow key={set.set}>
                <TableCell>{set.set}</TableCell>
                <TableCell>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={set.weight}
                    onChange={(e) => updateSet(index, 'weight', e.target.value)}
                    placeholder="Weight"
                    className="w-20 bg-white text-black [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ color: 'black' }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={set.unit}
                    onValueChange={(value) => updateSet(index, 'unit', value as 'lbs' | 'kg')}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={set.reps}
                    onChange={(e) => updateSet(index, 'reps', e.target.value)}
                    placeholder="Reps"
                    className="w-20 bg-white text-black [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ color: 'black' }}
                  />
                </TableCell>
                <TableCell>
                  {sets.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSet(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between mt-4">
          <Button onClick={addSet} variant="outline">
            Add Set
          </Button>
          <Button onClick={handleSave}>
            Log Exercise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 