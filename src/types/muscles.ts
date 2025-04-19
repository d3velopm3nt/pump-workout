export interface MuscleGroup {
  name: string;
  muscles: string[];
}

export const muscleGroups: MuscleGroup[] = [
  {
    name: "Chest",
    muscles: ["Upper Chest", "Middle Chest", "Lower Chest"]
  },
  {
    name: "Back",
    muscles: ["Upper Back", "Middle Back", "Lower Back", "Lats", "Traps"]
  },
  {
    name: "Biceps",
    muscles: ["Long Head", "Short Head", "Brachialis"]
  },
  {
    name: "Triceps", 
    muscles: ["Long Head", "Lateral Head", "Medial Head"]
  },
  {
    name: "Forearms",
    muscles: ["Flexors", "Extensors", "Brachioradialis"]
  },
  {
    name: "Shoulders",
    muscles: ["Front Deltoids", "Side Deltoids", "Rear Deltoids"]
  },
  {
    name: "Legs",
    muscles: ["Quadriceps", "Hamstrings", "Calves", "Glutes"]
  },
  {
    name: "Core",
    muscles: ["Upper Abs", "Lower Abs", "Obliques", "Lower Back"]
  }
];

export const equipment = [
  "Barbell",
  "Dumbbell",
  "Kettlebell",
  "Machine",
  "Cable",
  "Resistance Band",
  "Bodyweight",
  "Smith Machine",
  "Medicine Ball",
  "Foam Roller",
  "Pull-up Bar",
  "Bench"
]; 