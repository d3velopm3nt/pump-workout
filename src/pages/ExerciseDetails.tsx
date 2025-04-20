import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dumbbell, Target, Flame, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GiMuscleUp } from 'react-icons/gi';
import { getExerciseById } from '@/services/exerciseService';

interface SelectedMuscle {
  name: string;
  effectiveness: 'low' | 'middle' | 'high' | 'primary';
}

interface Exercise {
  _id: string;
  name: string;
  description: string;
  muscles: SelectedMuscle[];
  equipment: string[];
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
}

const EffectivenessColor: Record<SelectedMuscle['effectiveness'], string> = {
  primary: 'text-green-500',
  high: 'text-blue-500',
  middle: 'text-yellow-500',
  low: 'text-gray-500',
};

export function ExerciseDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: exercise, isLoading } = useQuery({
    queryKey: ['exercise', id],
    queryFn: async () => {
      if (!id) throw new Error('Exercise ID is required');
      const data = await getExerciseById(id);
      return data as Exercise;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
            <GiMuscleUp className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400">Exercise Not Found</h2>
            <p className="text-gray-500 mt-2">The exercise you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-base-100 to-base-200 border-2 border-primary/20">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {exercise.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Description Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Description
              </Label>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {exercise.description || 'No description available'}
              </p>
            </motion.div>

            {/* Muscles Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Label className="text-lg font-semibold flex items-center gap-2">
                <GiMuscleUp className="h-5 w-5 text-primary" />
                Muscles
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exercise.muscles?.map((muscle, index) => (
                  <motion.div
                    key={`${muscle.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg bg-base-200/50 border border-base-300"
                  >
                    <span>{muscle.name}</span>
                    <span className={`font-semibold ${EffectivenessColor[muscle.effectiveness]}`}>
                      {muscle.effectiveness}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Equipment Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" />
                Equipment
              </Label>
              <div className="flex flex-wrap gap-2">
                {exercise.equipment?.map((item, index) => (
                  <motion.span
                    key={`${item}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Instructions Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <Label className="text-lg font-semibold flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-primary" />
                Instructions
              </Label>
              <div className="space-y-3">
                {exercise.instructions?.map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 items-start p-3 rounded-lg bg-base-200/50 border border-base-300"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">{instruction}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Tips
              </Label>
              <div className="space-y-2">
                {exercise.tips?.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-base-200/50 border border-base-300"
                  >
                    <Flame className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Common Mistakes Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Common Mistakes to Avoid
              </Label>
              <div className="space-y-2">
                {exercise.commonMistakes?.map((mistake, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-base-200/50 border border-base-300"
                  >
                    <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-300">{mistake}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 