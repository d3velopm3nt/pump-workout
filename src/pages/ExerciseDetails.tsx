import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface SelectedMuscle {
  name: string;
  effectiveness: 'low' | 'middle' | 'high' | 'primary';
}

interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscles: SelectedMuscle[];
  equipment: string[];
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
}

export function ExerciseDetails() {
  const { id } = useParams();

  const { data: exercise, isLoading } = useQuery<Exercise>({
    queryKey: ['exercise', id],
    queryFn: async () => {
      const response = await fetch(`/api/exercises/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exercise');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500">Exercise not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{exercise.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-lg font-semibold">Description</Label>
            <p className="mt-2 text-gray-700">{exercise.description}</p>
          </div>

          <div>
            <Label className="text-lg font-semibold">Muscles</Label>
            <div className="mt-2 border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Muscle</th>
                    <th className="px-4 py-2 text-left">Effectiveness</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.muscles.map((muscle) => (
                    <tr key={muscle.name} className="border-t">
                      <td className="px-4 py-2">{muscle.name}</td>
                      <td className="px-4 py-2">
                        <span className={`capitalize ${
                          muscle.effectiveness === 'primary' ? 'text-green-600 font-semibold' :
                          muscle.effectiveness === 'high' ? 'text-blue-600' :
                          muscle.effectiveness === 'middle' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {muscle.effectiveness}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold">Equipment</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {exercise.equipment.map((item) => (
                <span key={item} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-lg font-semibold">Instructions</Label>
            <ol className="mt-2 list-decimal list-inside space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>

          <div>
            <Label className="text-lg font-semibold">Tips</Label>
            <ul className="mt-2 list-disc list-inside space-y-2">
              {exercise.tips.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>

          <div>
            <Label className="text-lg font-semibold">Common Mistakes</Label>
            <ul className="mt-2 list-disc list-inside space-y-2">
              {exercise.commonMistakes.map((mistake, index) => (
                <li key={index} className="text-gray-700">{mistake}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 