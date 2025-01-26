import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBodySections, getMuscleGroups } from '../../config/exercises';
import { ChevronRight, Dumbbell } from 'lucide-react';

export const MuscleGroupNavigation = () => {
  const [selectedSection, setSelectedSection] = useState<'Upper' | 'Lower' | null>(null);
  const navigate = useNavigate();
  const sections = getBodySections();

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
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {getMuscleGroups(section as "Upper" | "Lower").map(group => (
                    <button
                      key={group}
                      className="btn btn-primary flex items-center justify-between"
                      onClick={() => navigate(`/muscles/${section.toLowerCase()}/${group.toLowerCase()}`)}
                    >
                      {group}
                      <ChevronRight className="h-4 w-4" />
                    </button>
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