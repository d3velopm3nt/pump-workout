import { connectToDatabase } from '../utils/mongodb';
import { Exercise } from '../types/exercise';
import { Collection, ObjectId } from 'mongodb';

export async function createExercise(exercise: Omit<Exercise, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<Exercise>('exercises');
    
    const newExercise = {
      ...exercise,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(newExercise);
    return { ...newExercise, _id: result.insertedId };
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
    const db = await connectToDatabase();
    const collection = db.collection<Exercise>('exercises');
    const query: any = {};
    
    if (filters?.muscleGroup) {
      query.muscleGroups = { $in: [filters.muscleGroup] };
    }
    
    if (filters?.equipment) {
      query.equipment = { $in: [filters.equipment] };
    }
    
    if (filters?.difficulty) {
      query.difficulty = filters.difficulty;
    }
    
    if (filters?.search) {
      return await collection.find({
        $or: [
          { name: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ]
      }).toArray();
    }
    
    return await collection.find(query).toArray();
  } catch (error) {
    console.error('Error getting exercises:', error);
    throw error;
  }
}

export async function getExerciseById(id: string) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<Exercise>('exercises');
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error getting exercise:', error);
    throw error;
  }
}

export async function updateExercise(id: string, exercise: Partial<Exercise>) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<Exercise>('exercises');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...exercise,
          updatedAt: new Date()
        }
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating exercise:', error);
    throw error;
  }
}

export async function deleteExercise(id: string) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<Exercise>('exercises');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting exercise:', error);
    throw error;
  }
} 