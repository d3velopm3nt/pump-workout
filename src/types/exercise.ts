export type MuscleGroup = {
  name: string;
  common: string;
  exercises: string[];
};

export type BodySection = {
  [key: string]: MuscleGroup[];
};

export type BodyData = {
  Upper: {
    Chest: MuscleGroup[];
    Back: MuscleGroup[];
    Shoulders: MuscleGroup[];
    Arms: MuscleGroup[];
  };
  Lower: {
    Legs: MuscleGroup[];
    Core: MuscleGroup[];
  };
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  environment: 'gym' | 'home' | 'outdoor';
  equipment: string[];
  description: string;
  userSubmitted: boolean;
  createdBy: string;
  votes: number;
  variations: string[];
}; 