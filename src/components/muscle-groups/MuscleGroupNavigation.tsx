import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { getMuscles, getBodySections, getMuscleGroups } from '../../config/exercises';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';
import { FaDumbbell, FaBolt, FaFire } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MuscleGroupNavigation = () => {
  const [selectedSection, setSelectedSection] = useState<'Upper' | 'Lower' | null>(null);
  const navigate = useNavigate();

  const sections = getBodySections();

  // Mock data for gamification elements
  const getSectionStats = (section: string) => ({
    totalExercises: getMuscleGroups(section as "Upper" | "Lower")
      .flatMap(group => getMuscles(section as "Upper" | "Lower", group))
      .reduce((acc, muscle) => acc + muscle.exercises.length, 0),
    completedToday: Math.floor(Math.random() * 5),
    xpAvailable: Math.floor(Math.random() * 500) + 200
  });

  const getMuscleGroupStats = (section: string, group: string) => ({
    difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
    exercises: getMuscles(section as "Upper" | "Lower", group).reduce(
      (acc, muscle) => acc + muscle.exercises.length, 0
    ),
    progress: Math.floor(Math.random() * 100)
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-success';
      case 'Intermediate': return 'badge-warning';
      case 'Advanced': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  const handleMuscleGroupClick = (section: string, group: string) => {
    navigate('/exercises', { state: { section, group } });
  };

  // Add useEffect to set default section when component mounts
  useEffect(() => {
    if (!selectedSection) {
      setSelectedSection('Upper');
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
        <GiMuscleUp className="w-10 h-10 text-primary" />
        Training Zones
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map(section => {
          const stats = getSectionStats(section);
          return (
            <div key={section} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="card-title text-2xl flex items-center gap-2">
                    <GiMuscleUp className="h-8 w-8 text-primary" />
                    {section} Body
                  </h2>
                  <div className="stats bg-base-300 shadow">
                    <div className="stat p-2">
                      <div className="stat-title text-xs">Available XP</div>
                      <div className="stat-value text-primary text-xl">{stats.xpAvailable}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FaDumbbell className="text-primary" />
                    <span>{stats.totalExercises} exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFire className="text-error" />
                    <span>{stats.completedToday} completed today</span>
                  </div>
                </div>

                {selectedSection === section ? (
                  <div className="grid gap-4 animate-fadeIn">
                    {getMuscleGroups(section as "Upper" | "Lower").map(group => {
                      const groupStats = getMuscleGroupStats(section, group);
                      return (
                        <div
                          key={group}
                          onClick={() => handleMuscleGroupClick(section, group)}
                          className="card bg-base-300 hover:bg-base-100 cursor-pointer transition-all"
                        >
                          <div className="card-body p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="card-title flex items-center gap-2">
                                  <GiWeightLiftingUp className="w-6 h-6 text-primary" />
                                  {group}
                                </h3>
                                <div className="flex gap-4 mt-2 text-sm text-base-content/70">
                                  <span>{groupStats.exercises} exercises</span>
                                  <span>{groupStats.progress}% explored</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className={`badge ${getDifficultyColor(groupStats.difficulty)}`}>
                                  {groupStats.difficulty}
                                </div>
                                <div className="flex items-center gap-1 text-warning text-sm">
                                  <FaBolt />
                                  <span>{Math.floor(stats.xpAvailable / 3)} XP</span>
                                </div>
                              </div>
                            </div>
                            <progress
                              className="progress progress-primary w-full mt-2"
                              value={groupStats.progress}
                              max="100"
                            />
                            <div className="flex justify-end mt-2">
                              <span className="text-primary text-sm flex items-center gap-1">
                                View Exercises <ChevronRight className="h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-base-content/70 mb-4">
                      Explore {section.toLowerCase()} body exercises and earn XP through consistent training.
                    </p>
                    <button
                      className="btn btn-primary w-full gap-2"
                      onClick={() => setSelectedSection(section as 'Upper' | 'Lower')}
                    >
                      <FaDumbbell className="w-4 h-4" />
                      Explore {section} Body
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 