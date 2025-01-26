import { useParams } from 'react-router-dom';
import { getMuscles } from '../../config/exercises';

export const ExerciseList = () => {
  const { section, group } = useParams();
  const muscles = getMuscles(section as "Upper" | "Lower", group || "");

  return (
    <div>
      {muscles.map(muscle => (
        <div key={muscle.name}>
          <h2>{muscle.common} ({muscle.name})</h2>
          <ul>
            {muscle.exercises.map(exercise => (
              <li key={exercise}>{exercise}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}; 