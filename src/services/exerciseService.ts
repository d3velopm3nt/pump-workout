import { fetchFromApi } from '../utils/api';
import type { Exercise } from '../types/exercise';

async function createExercise(exercise: Omit<Exercise, '_id' | 'createdAt' | 'updatedAt'>) {
  return fetchFromApi<Exercise>('/exercises', {
    method: 'POST',
    body: JSON.stringify(exercise),
  });
}

async function getExerciseById(id: string) {
  return fetchFromApi<Exercise>(`/exercises/${id}`);
}

async function getExercises(filters?: {
  muscleGroup?: string;
  muscles?: string[];
  equipment?: string[];
  search?: string;
}) {
  const queryParams = new URLSearchParams();
  
  if (filters?.muscleGroup) {
    queryParams.append('muscleGroup', filters.muscleGroup);
  }
  
  if (filters?.muscles?.length) {
    filters.muscles.forEach(muscle => {
      queryParams.append('muscles', muscle);
    });
  }
  
  if (filters?.equipment?.length) {
    filters.equipment.forEach(item => {
      queryParams.append('equipment', item);
    });
  }
  
  if (filters?.search) {
    queryParams.append('search', filters.search);
  }
  
  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return fetchFromApi<Exercise[]>(`/exercises${query}`);
}

async function updateExercise(id: string, exercise: Partial<Exercise>) {
  return fetchFromApi<Exercise>(`/exercises/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(exercise),
  });
}

async function deleteExercise(id: string) {
  return fetchFromApi(`/exercises/${id}`, {
    method: 'DELETE',
  });
}

export const exerciseService = {
  createExercise,
  getExerciseById,
  getExercises,
  updateExercise,
  deleteExercise,
};

// Also export individual functions for components that use them directly
export {
  createExercise,
  getExerciseById,
  getExercises,
  updateExercise,
  deleteExercise,
}; 