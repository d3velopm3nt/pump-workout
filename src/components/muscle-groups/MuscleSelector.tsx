import React, { useState } from 'react';
import { muscleGroups } from '../../types/muscles';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface SelectedMuscle {
  name: string;
  effectiveness: 'low' | 'middle' | 'high' | 'primary';
}

interface MuscleSelectorProps {
  onSelectedMusclesChange: (muscles: SelectedMuscle[]) => void;
  selectedMuscles?: SelectedMuscle[];
}

export const MuscleSelector: React.FC<MuscleSelectorProps> = ({
  onSelectedMusclesChange,
  selectedMuscles = [],
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>(muscleGroups[0].name);

  const handleMuscleToggle = (muscle: string, checked: boolean) => {
    console.log('Toggling muscle:', muscle, 'Checked:', checked);
    if (checked) {
      const newSelectedMuscles: SelectedMuscle[] = [...selectedMuscles, { name: muscle, effectiveness: 'middle' as const }];
      console.log('New selected muscles:', newSelectedMuscles);
      onSelectedMusclesChange(newSelectedMuscles);
    } else {
      const filteredMuscles = selectedMuscles.filter(m => m.name !== muscle);
      console.log('Filtered muscles:', filteredMuscles);
      onSelectedMusclesChange(filteredMuscles);
    }
  };

  const handleEffectivenessChange = (muscleName: string, effectiveness: 'low' | 'middle' | 'high' | 'primary') => {
    const updatedMuscles = selectedMuscles.map(muscle => 
      muscle.name === muscleName ? { ...muscle, effectiveness } : muscle
    );
    console.log('Updated muscles effectiveness:', updatedMuscles);
    onSelectedMusclesChange(updatedMuscles);
  };

  console.log('Current selected muscles:', selectedMuscles);
  console.log('Current selected group:', selectedGroup);

  return (
    <div className="space-y-6 border p-2 sm:p-4 rounded-lg bg-white">
      <div>
        <Label className="text-base font-semibold mb-2 block text-black">Muscle Groups & Muscles</Label>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-full bg-white border-gray-300">
            <SelectValue placeholder="Select muscle group" />
          </SelectTrigger>
          <SelectContent>
            {muscleGroups.map((group) => (
              <SelectItem key={group.name} value={group.name}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-4 space-y-2 border p-2 sm:p-3 rounded-md bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {muscleGroups
              .find((group) => group.name === selectedGroup)
              ?.muscles.map((muscle) => (
                <div key={muscle} className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                  <Checkbox
                    id={`muscle-${muscle}`}
                    checked={selectedMuscles.some(m => m.name === muscle)}
                    onCheckedChange={(checked: boolean) => handleMuscleToggle(muscle, checked)}
                    className="border-green-500 bg-white data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor={`muscle-${muscle}`}
                    className="text-sm font-normal leading-none cursor-pointer select-none text-black"
                  >
                    {muscle}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      </div>

      {selectedMuscles.length > 0 && (
        <div className="mt-6">
          <Label className="text-base font-semibold mb-2 block text-black">Selected Muscles</Label>
          <div className="border rounded-lg overflow-x-auto bg-white">
            <table className="w-full min-w-[300px]">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-2 sm:px-4 py-2 text-left font-medium text-black">Muscle</th>
                  <th className="px-2 sm:px-4 py-2 text-left font-medium text-black">Effectiveness</th>
                </tr>
              </thead>
              <tbody>
                {selectedMuscles.map((muscle) => (
                  <tr key={muscle.name} className="border-b last:border-b-0">
                    <td className="px-2 sm:px-4 py-2 flex items-center justify-between">
                      <span className="text-black">{muscle.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const filteredMuscles = selectedMuscles.filter(m => m.name !== muscle.name);
                          onSelectedMusclesChange(filteredMuscles);
                        }}
                        className="text-gray-500 hover:text-red-500 transition-colors ml-2"
                      >
                        ✕
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <Select
                        value={muscle.effectiveness}
                        onValueChange={(value: 'low' | 'middle' | 'high' | 'primary') => 
                          handleEffectivenessChange(muscle.name, value)
                        }
                      >
                        <SelectTrigger className="w-[100px] sm:w-[120px] bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}; 