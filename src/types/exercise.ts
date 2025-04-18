import { ObjectId } from 'mongodb';

export interface Exercise {
  _id?: ObjectId;
  name: string;
  description: string;
  muscleGroups: string[];
  primaryMuscle: string;
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  videoUrl?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MuscleGroup {
  name: string;
  muscles: string[];
}

export const muscleGroups: MuscleGroup[] = [
  {
    name: 'Chest',
    muscles: ['Upper Chest', 'Middle Chest', 'Lower Chest']
  },
  {
    name: 'Back',
    muscles: ['Latissimus Dorsi', 'Trapezius', 'Rhomboids', 'Lower Back']
  },
  {
    name: 'Legs',
    muscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes']
  },
  {
    name: 'Shoulders',
    muscles: ['Front Deltoid', 'Middle Deltoid', 'Rear Deltoid']
  },
  {
    name: 'Arms',
    muscles: ['Biceps', 'Triceps', 'Forearms']
  },
  {
    name: 'Core',
    muscles: ['Rectus Abdominis', 'Obliques', 'Lower Back']
  }
];

export const equipmentList = [
  'Barbell',
  'Dumbbell',
  'Kettlebell',
  'Resistance Bands',
  'Cable Machine',
  'Smith Machine',
  'Bodyweight',
  'Pull-up Bar',
  'Bench',
  'Squat Rack',
  'Medicine Ball',
  'Foam Roller',
  'TRX/Suspension Trainer',
  'Yoga Mat',
  'Weight Plates',
  'EZ Bar',
  'Leg Press Machine',
  'Lat Pulldown Machine',
  'Rowing Machine',
  'Exercise Bike'
];

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