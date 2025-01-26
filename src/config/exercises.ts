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
      {
        "name": "Latissimus Dorsi",
        "common": "Lats",
        "exercises": [
          "Pull-ups",
          "Lat Pulldown",
          "Bent-over Rows",
          "Single-arm Dumbbell Row"
        ]
      },
      {
        "name": "Trapezius",
        "common": "Traps",
        "exercises": [
          "Shrugs",
          "Face Pulls",
          "Upright Rows",
          "Deadlifts"
        ]
      },
      {
        "name": "Rhomboids",
        "common": "Upper Back",
        "exercises": [
          "Face Pulls",
          "Seated Cable Row",
          "Reverse Fly",
          "T-bar Row"
        ]
      },
      {
        "name": "Erector Spinae",
        "common": "Lower Back",
        "exercises": [
          "Deadlifts",
          "Back Extensions",
          "Good Mornings",
          "Superman Exercise"
        ]
      }
    ],
    "Shoulders": [
      {
        "name": "Deltoid (Anterior)",
        "common": "Front Shoulder",
        "exercises": [
          "Front Raises",
          "Overhead Press",
          "Arnold Press",
          "Push Press"
        ]
      },
      {
        "name": "Deltoid (Lateral)",
        "common": "Side Shoulder",
        "exercises": [
          "Lateral Raises",
          "Cable Lateral Raise",
          "Arnold Press",
          "Upright Rows"
        ]
      },
      {
        "name": "Deltoid (Posterior)",
        "common": "Rear Shoulder",
        "exercises": [
          "Reverse Fly",
          "Face Pulls",
          "Bent-over Rear Delt Raise",
          "Reverse Pec Deck Machine"
        ]
      },
      {
        "name": "Rotator Cuff",
        "common": "Shoulder Stabilizers",
        "exercises": [
          "External Rotations",
          "Internal Rotations",
          "Face Pulls",
          "Resistance Band Exercises"
        ]
      }
    ],
    "Arms": [
      {
        "name": "Biceps Brachii",
        "common": "Biceps",
        "exercises": [
          "Barbell Curls",
          "Dumbbell Curls",
          "Hammer Curls",
          "Preacher Curls"
        ]
      },
      {
        "name": "Triceps Brachii",
        "common": "Triceps",
        "exercises": [
          "Triceps Dips",
          "Overhead Triceps Extension",
          "Triceps Pushdown",
          "Close-grip Bench Press"
        ]
      },
      {
        "name": "Brachialis",
        "common": "Inner Biceps",
        "exercises": [
          "Hammer Curls",
          "Reverse Curls",
          "Preacher Curls",
          "Concentration Curls"
        ]
      },
      {
        "name": "Forearm Flexors",
        "common": "Inner Forearm",
        "exercises": [
          "Wrist Curls",
          "Reverse Wrist Curls",
          "Farmer's Carry",
          "Wrist Roller"
        ]
      },
      {
        "name": "Forearm Extensors",
        "common": "Outer Forearm",
        "exercises": [
          "Reverse Wrist Curls",
          "Reverse Barbell Curls",
          "Zottman Curls",
          "Finger Curls"
        ]
      }
    ]
  },
  "Lower": {
    "Legs": [
      {
        "name": "Quadriceps",
        "common": "Quads",
        "exercises": [
          "Squats",
          "Leg Press",
          "Lunges",
          "Leg Extensions"
        ]
      },
      {
        "name": "Hamstrings",
        "common": "Hamstrings",
        "exercises": [
          "Deadlifts",
          "Leg Curls",
          "Romanian Deadlifts",
          "Nordic Curls"
        ]
      },
      {
        "name": "Gluteus Maximus",
        "common": "Glutes",
        "exercises": [
          "Hip Thrusts",
          "Glute Bridges",
          "Step-ups",
          "Bulgarian Split Squats"
        ]
      },
      {
        "name": "Adductors",
        "common": "Inner Thigh",
        "exercises": [
          "Sumo Deadlifts",
          "Copenhagen Plank",
          "Adductor Machine",
          "Side Lunges"
        ]
      },
      {
        "name": "Abductors",
        "common": "Outer Thigh",
        "exercises": [
          "Side Leg Raises",
          "Banded Lateral Walks",
          "Clamshells",
          "Cable Hip Abduction"
        ]
      },
      {
        "name": "Calves (Gastrocnemius, Soleus)",
        "common": "Calves",
        "exercises": [
          "Standing Calf Raises",
          "Seated Calf Raises",
          "Donkey Calf Raises",
          "Jump Rope"
        ]
      }
    ],
    "Core": [
      {
        "name": "Rectus Abdominis",
        "common": "Abs",
        "exercises": [
          "Crunches",
          "Leg Raises",
          "Planks",
          "Cable Crunches"
        ]
      },
      {
        "name": "Obliques",
        "common": "Side Abs",
        "exercises": [
          "Russian Twists",
          "Side Planks",
          "Woodchoppers",
          "Bicycle Crunches"
        ]
      },
      {
        "name": "Transverse Abdominis",
        "common": "Deep Core",
        "exercises": [
          "Vacuum Exercise",
          "Planks",
          "Dead Bug",
          "Pallof Press"
        ]
      },
      {
        "name": "Erector Spinae",
        "common": "Lower Back",
        "exercises": [
          "Superman Exercise",
          "Good Mornings",
          "Romanian Deadlifts",
          "Hyperextensions"
        ]
      }
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