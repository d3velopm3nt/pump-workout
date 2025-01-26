import { BodyData } from '../types/exercise';

export const muscleGroups: BodyData = {
  Upper: {
    Chest: [
      {
        name: "Pectoralis Major (Upper)",
        common: "Upper Chest",
        exercises: [
          "Incline Bench Press",
          "Incline Dumbbell Press",
          "Incline Cable Fly",
          "Push-ups (Incline)"
        ]
      },
      // ... rest of the chest data
    ],
    // ... rest of the upper body data
  },
  Lower: {
    // ... lower body data
  }
}; 