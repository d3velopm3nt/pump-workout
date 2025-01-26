export interface Exercise {
  name: string;
  common: string;
  exercises: string[];
}

export interface MuscleGroup {
  [key: string]: Exercise[];
}

export interface BodySection {
  [key: string]: MuscleGroup;
}

export const exerciseConfig: BodySection = {
  "Upper": {
    "Chest": [
      {
        "name": "Pectoralis Major (Upper)",
        "common": "Upper Chest",
        "exercises": [
          "Incline Bench Press",
          "Incline Dumbbell Press",
          "Incline Cable Fly",
          "Push-ups (Incline)"
        ]
      },
      {
        "name": "Pectoralis Major (Middle)",
        "common": "Middle Chest",
        "exercises": [
          "Flat Bench Press",
          "Dumbbell Bench Press",
          "Cable Chest Fly",
          "Push-ups"
        ]
      },
      {
        "name": "Pectoralis Major (Lower)",
        "common": "Lower Chest",
        "exercises": [
          "Decline Bench Press",
          "Decline Dumbbell Press",
          "Decline Cable Fly",
          "Dips"
        ]
      },
      {
        "name": "Pectoralis Minor",
        "common": "Inner Chest",
        "exercises": [
          "Chest Fly Machine",
          "Cable Crossovers",
          "Squeeze Press",
          "Push-ups (Close Grip)"
        ]
      }
    ],
    "Back": [
      // ... Back exercises (as provided in the JSON)
    ],
    "Shoulders": [
      // ... Shoulder exercises (as provided in the JSON)
    ],
    "Arms": [
      // ... Arm exercises (as provided in the JSON)
    ]
  },
  "Lower": {
    "Legs": [
      // ... Leg exercises (as provided in the JSON)
    ],
    "Core": [
      // ... Core exercises (as provided in the JSON)
    ]
  }
} as const;

// Helper functions to access the config
export const getBodySections = (): string[] => {
  return Object.keys(exerciseConfig);
};

export const getMuscleGroups = (section: keyof typeof exerciseConfig): string[] => {
  return Object.keys(exerciseConfig[section]);
};

export const getMuscles = (
  section: keyof typeof exerciseConfig,
  group: string
): Exercise[] => {
  return exerciseConfig[section][group] || [];
};

export const getExercises = (
  section: keyof typeof exerciseConfig,
  group: string,
  muscleName: string
): string[] => {
  const muscle = exerciseConfig[section][group]?.find(
    (m) => m.name === muscleName || m.common === muscleName
  );
  return muscle?.exercises || [];
};

// Example usage:
// const bodySections = getBodySections(); // ["Upper", "Lower"]
// const muscleGroups = getMuscleGroups("Upper"); // ["Chest", "Back", "Shoulders", "Arms"]
// const muscles = getMuscles("Upper", "Chest"); // Array of chest muscles
// const exercises = getExercises("Upper", "Chest", "Upper Chest"); // Array of upper chest exercises 