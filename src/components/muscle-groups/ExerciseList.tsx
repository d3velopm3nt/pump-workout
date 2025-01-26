import { useParams, Link } from 'react-router-dom';
import { getMuscles } from '../../config/exercises';
import { ChevronRight, Dumbbell } from 'lucide-react';

export const ExerciseList = () => {
  const { section, group } = useParams<{ section: string; group: string }>();
  const muscles = getMuscles(section as "Upper" | "Lower", group || "");

  if (!muscles.length) {
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
          <li><Link to="/">Body Sections</Link></li>
          <li>{section}</li>
          <li className="text-primary">{group}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {muscles.map((muscle) => (
          <div key={muscle.name} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {muscle.common}
                <span className="text-sm text-base-content/60">
                  {muscle.name}
                </span>
              </h2>
              
              <div className="divide-y divide-base-300">
                {muscle.exercises.map((exercise) => (
                  <Link
                    key={exercise}
                    to={`/exercise/${encodeURIComponent(exercise)}`}
                    className="flex items-center justify-between py-3 hover:bg-base-300 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Dumbbell className="h-5 w-5 text-primary" />
                      <span>{exercise}</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 