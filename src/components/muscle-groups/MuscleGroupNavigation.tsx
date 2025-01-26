import { useState } from 'react';
import { ChevronRight, Dumbbell, ChevronDown, ChevronUp } from 'lucide-react';
import { getMuscles, getBodySections, getMuscleGroups } from '../../config/exercises';

export const MuscleGroupNavigation = () => {
  const [selectedSection, setSelectedSection] = useState<'Upper' | 'Lower' | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const sections = getBodySections();

  const handleGroupClick = (group: string) => {
    setSelectedGroup(selectedGroup === group ? null : group);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Choose Your Training Focus</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(section => (
          <div key={section} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <h2 className="card-title text-2xl flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-primary" />
                {section} Body
              </h2>
              
              {selectedSection === section ? (
                <div className="space-y-4 mt-4">
                  {getMuscleGroups(section as "Upper" | "Lower").map(group => (
                    <div key={group} className="space-y-2">
                      <button
                        className="btn btn-primary w-full flex items-center justify-between"
                        onClick={() => handleGroupClick(group)}
                      >
                        {group}
                        {selectedGroup === group ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {/* Muscles and exercises list */}
                      {selectedGroup === group && (
                        <div className="grid gap-4 mt-4 animate-fadeIn">
                          {getMuscles(section as "Upper" | "Lower", group).map((muscle) => (
                            <div key={muscle.name} className="card bg-base-300">
                              <div className="card-body p-4">
                                <h3 className="card-title text-lg">
                                  {muscle.common}
                                  <span className="text-sm text-base-content/60">
                                    {muscle.name}
                                  </span>
                                </h3>
                                
                                <div className="divide-y divide-base-content/10">
                                  {muscle.exercises.map((exercise) => (
                                    <div
                                      key={exercise}
                                      className="flex items-center gap-3 py-2"
                                    >
                                      <Dumbbell className="h-4 w-4 text-primary" />
                                      <span>{exercise}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-base-content/70 mb-4">
                    Focus on your {section.toLowerCase()} body exercises and build strength systematically.
                  </p>
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => setSelectedSection(section as 'Upper' | 'Lower')}
                  >
                    Explore {section} Body
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 