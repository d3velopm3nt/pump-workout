import { fetchFromApi } from '../utils/mongodb';
import type { Exercise } from '../types/exercise';

export async function createExercise(exercise: Omit<Exercise, '_id' | 'createdAt' | 'updatedAt'>) {
  return fetchFromApi<Exercise>('/exercises', {
    method: 'POST',
    body: JSON.stringify(exercise),
  });
}

export async function getExercises(filters?: {
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

export async function getExerciseById(id: string) {
  return fetchFromApi<Exercise>(`/exercises/${id}`);
}

export async function updateExercise(id: string, exercise: Partial<Exercise>) {
  return fetchFromApi<Exercise>(`/exercises/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(exercise),
  });
}

export async function deleteExercise(id: string) {
  return fetchFromApi(`/exercises/${id}`, {
    method: 'DELETE',
  });
} 