import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { muscleGroups } from '../../config/muscleGroups';

export const MuscleGroupNavigation = () => {
  const [selectedSection, setSelectedSection] = useState<'Upper' | 'Lower' | null>(null);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(muscleGroups).map(([section, data]) => (
          <div key={section} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{section} Body</h2>
              {selectedSection === section ? (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(data).map(([muscleGroup, exercises]) => (
                    <button
                      key={muscleGroup}
                      className="btn btn-primary"
                      onClick={() => navigate(`/muscles/${section.toLowerCase()}/${muscleGroup.toLowerCase()}`)}
                    >
                      {muscleGroup}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedSection(section as 'Upper' | 'Lower')}
                >
                  Explore {section} Body
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 