import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { MuscleSelector } from '@/components/muscle-groups/MuscleSelector';

interface SelectedMuscle {
  name: string;
  effectiveness: 'low' | 'middle' | 'high' | 'primary';
}

interface Exercise {
  name: string;
  description: string;
  muscles: SelectedMuscle[];
  equipment: string;
  difficulty: string;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
}

export function ExerciseSetup() {
  const [exercise, setExercise] = useState<Exercise>({
    name: '',
    description: '',
    muscles: [],
    equipment: '',
    difficulty: 'intermediate',
    instructions: [''],
    tips: [''],
    commonMistakes: [''],
  });

  const queryClient = useQueryClient();

  const createExerciseMutation = useMutation({
    mutationFn: async (newExercise: Exercise) => {
      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExercise),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create exercise');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      toast({
        title: 'Success',
        description: 'Exercise created successfully',
      });
      // Reset form
      setExercise({
        name: '',
        description: '',
        muscles: [],
        equipment: '',
        difficulty: 'intermediate',
        instructions: [''],
        tips: [''],
        commonMistakes: [''],
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create exercise',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExerciseMutation.mutate(exercise);
  };

  const handleArrayInput = (
    field: keyof Pick<Exercise, 'instructions' | 'tips' | 'commonMistakes'>,
    index: number,
    value: string
  ) => {
    setExercise((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (
    field: keyof Pick<Exercise, 'instructions' | 'tips' | 'commonMistakes'>
  ) => {
    setExercise((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const handleSelectedMusclesChange = (muscles: SelectedMuscle[]) => {
    setExercise({ ...exercise, muscles });
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Exercise Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Exercise Name</Label>
              <Input
                id="name"
                value={exercise.name}
                onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={exercise.description}
                onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
                required
              />
            </div>

            <MuscleSelector
              selectedMuscles={exercise.muscles}
              onSelectedMusclesChange={handleSelectedMusclesChange}
            />


            <div>
              <Label>Instructions</Label>
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="mt-2">
                  <Input
                    value={instruction}
                    onChange={(e) =>
                      handleArrayInput('instructions', index, e.target.value)
                    }
                    placeholder={`Step ${index + 1}`}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() => addArrayItem('instructions')}
              >
                Add Step
              </Button>
            </div>

            <div>
              <Label>Tips</Label>
              {exercise.tips.map((tip, index) => (
                <div key={index} className="mt-2">
                  <Input
                    value={tip}
                    onChange={(e) => handleArrayInput('tips', index, e.target.value)}
                    placeholder={`Tip ${index + 1}`}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() => addArrayItem('tips')}
              >
                Add Tip
              </Button>
            </div>

            <div>
              <Label>Common Mistakes</Label>
              {exercise.commonMistakes.map((mistake, index) => (
                <div key={index} className="mt-2">
                  <Input
                    value={mistake}
                    onChange={(e) =>
                      handleArrayInput('commonMistakes', index, e.target.value)
                    }
                    placeholder={`Mistake ${index + 1}`}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={() => addArrayItem('commonMistakes')}
              >
                Add Common Mistake
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Create Exercise
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 