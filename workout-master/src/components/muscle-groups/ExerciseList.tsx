import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { muscleGroups } from '../../config/muscleGroups';
import { ChevronRight, Dumbbell } from 'lucide-react';

export const ExerciseList = () => {
  const { section, group } = useParams<{ section: string; group: string }>();
  
  const exercises = muscleGroups[section as keyof typeof muscleGroups]?.[
    group as keyof (typeof muscleGroups)[keyof typeof muscleGroups]
  ];

  if (!exercises) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-lg">Muscle group not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6 text-sm breadcrumbs">
        <ul>
          <li><a href="/">Body Sections</a></li>
          <li>{section}</li>
          <li className="text-primary">{group}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((muscleGroup) => (
          <div key={muscleGroup.name} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {muscleGroup.common}
                <span className="text-sm text-base-content/60">
                  {muscleGroup.name}
                </span>
              </h2>
              
              <div className="divide-y divide-base-300">
                {muscleGroup.exercises.map((exercise) => (
                  <div
                    key={exercise}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      <span>{exercise}</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 