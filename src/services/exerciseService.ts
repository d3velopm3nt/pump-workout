import { fetchFromApi, API_ENDPOINT } from '../utils/mongodb';
import type { Exercise } from '../types/exercise';

export async function createExercise(exercise: Omit<Exercise, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
    const response = await fetchFromApi('/exercises', {
      method: 'POST',
      body: JSON.stringify(exercise),
    });
    return response;
  } catch (error) {
    console.error('Error creating exercise:', error);
    throw error;
  }
}

export async function getExercises(filters?: {
  muscleGroup?: string;
  equipment?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  search?: string;
}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters?.muscleGroup) {
      queryParams.append('muscleGroup', filters.muscleGroup);
    }
    
    if (filters?.equipment) {
      queryParams.append('equipment', filters.equipment);
    }
    
    if (filters?.difficulty) {
      queryParams.append('difficulty', filters.difficulty);
    }
    
    if (filters?.search) {
      queryParams.append('search', filters.search);
    }
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return await fetchFromApi(`/exercises${query}`);
  } catch (error) {
    console.error('Error getting exercises:', error);
    throw error;
  }
}

export async function getExerciseById(id: string) {
  try {
    return await fetchFromApi(`/exercises/${id}`);
  } catch (error) {
    console.error('Error getting exercise:', error);
    throw error;
  }
}

export async function updateExercise(id: string, exercise: Partial<Exercise>) {
  try {
    return await fetchFromApi(`/exercises/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(exercise),
    });
  } catch (error) {
    console.error('Error updating exercise:', error);
    throw error;
  }
}

export async function deleteExercise(id: string) {
  try {
    return await fetchFromApi(`/exercises/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    throw error;
  }
} 