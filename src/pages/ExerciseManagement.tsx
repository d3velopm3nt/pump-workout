import React, { useState, ChangeEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { muscleGroups, equipment } from '../types/muscles';
import { Exercise, SelectedMuscle } from '../types/exercise';
import { createExercise, getExercises, updateExercise, deleteExercise } from '../services/exerciseService';
import { Textarea } from '../components/ui/textarea';
import { useAuthContext } from '../contexts/AuthContext';
import { MuscleSelector } from '../components/muscle-groups/MuscleSelector';

export function ExerciseManagement() {
  const queryClient = useQueryClient();
  const [selectedMuscles, setSelectedMuscles] = useState<SelectedMuscle[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Query for fetching exercises
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises', searchTerm],
    queryFn: async () => {
      const result = await getExercises({ search: searchTerm });
      console.log('API Response:', result); // Debug log
      return result;
    },
  });

  // Ensure exercises is always an array
  const exercises = Array.isArray(data) ? data : [];

  // Debug log
  console.log('Exercises state:', { data, exercises, isArray: Array.isArray(data) });

  // Mutations for CRUD operations
  const { mutate: createExerciseMutation } = useMutation({
    mutationKey: ['createExercise'],
    mutationFn: (exercise: Exercise) => createExercise(exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      resetForm();
    },
  });

  const { mutate: updateExerciseMutation } = useMutation({
    mutationKey: ['updateExercise'],
    mutationFn: ({ id, exercise }: { id: string; exercise: Partial<Exercise> }) => updateExercise(id, exercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      resetForm();
    },
  });

  const { mutate: deleteExerciseMutation } = useMutation({
    mutationKey: ['deleteExercise'],
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  const resetForm = () => {
    setIsEditing(false);
    setEditingExercise(null);
    setSelectedMuscles([]);
    setSelectedEquipment([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const exerciseData: Partial<Exercise> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      muscles: selectedMuscles,
      equipment: selectedEquipment,
      instructions: (formData.get('instructions') as string)?.split('\n').filter(Boolean) || [],
      tips: (formData.get('tips') as string)?.split('\n').filter(Boolean) || [],
      commonMistakes: (formData.get('commonMistakes') as string)?.split('\n').filter(Boolean) || [],
    };

    if (editingExercise?._id) {
      updateExerciseMutation({ id: editingExercise._id, exercise: exerciseData });
    } else {
      createExerciseMutation(exerciseData as Exercise);
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsEditing(true);
    setSelectedMuscles(exercise.muscles || []);
    setSelectedEquipment(exercise.equipment || []);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      deleteExerciseMutation(id);
    }
  };

  // Show error state if query fails
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <h2 className="text-lg font-semibold text-destructive">Error loading exercises</h2>
          <p className="text-destructive">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exercise Management</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="rounded-lg border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
            </h2>
            <Button variant="ghost" onClick={() => {
              setIsEditing(false);
              resetForm();
            }}>
              Cancel
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingExercise?.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingExercise?.description}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-4">
              <MuscleSelector
                selectedMuscles={selectedMuscles}
                onSelectedMusclesChange={setSelectedMuscles}
              />
            </div>

            <div className="space-y-2">
              <Label>Equipment (Multiple)</Label>
              <div className="grid grid-cols-3 gap-2">
                {equipment.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`equipment-${item}`}
                      checked={selectedEquipment.includes(item)}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          setSelectedEquipment([...selectedEquipment, item]);
                        } else {
                          setSelectedEquipment(selectedEquipment.filter((e) => e !== item));
                        }
                      }}
                    />
                    <Label htmlFor={`equipment-${item}`} className="text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions (One per line)</Label>
              <Textarea
                id="instructions"
                name="instructions"
                defaultValue={editingExercise?.instructions?.join('\n')}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tips">Tips (One per line)</Label>
              <Textarea
                id="tips"
                name="tips"
                defaultValue={editingExercise?.tips?.join('\n')}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commonMistakes">Common Mistakes (One per line)</Label>
              <Textarea
                id="commonMistakes"
                name="commonMistakes"
                defaultValue={editingExercise?.commonMistakes?.join('\n')}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="submit" variant="default">
                {editingExercise ? 'Update Exercise' : 'Create Exercise'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {exercises?.map((exercise) => (
              <div key={exercise._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    <div className="text-sm">
                      <p><strong>Muscles:</strong> {exercise.muscles?.map((m: SelectedMuscle) => `${m.name} (${m.effectiveness})`).join(', ') || 'None'}</p>
                      <p><strong>Equipment:</strong> {exercise.equipment?.join(', ') || 'None'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(exercise)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(exercise._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}