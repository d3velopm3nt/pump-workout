import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../index.js';

// Handler for /api/exercises endpoint
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');

    // Handle GET request - get all exercises
    if (req.method === 'GET') {
      const query = {};
      const { muscleGroup, equipment, difficulty, search } = req.query;
      
      if (muscleGroup) {
        query.muscleGroups = { $in: [muscleGroup] };
      }
      
      if (equipment) {
        query.equipment = { $in: [equipment] };
      }
      
      if (difficulty) {
        query.difficulty = difficulty;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      
      const exercises = await collection.find(query).toArray();
      return res.status(200).json(exercises);
    }
    
    // Handle POST request - create exercise
    else if (req.method === 'POST') {
      let exercise;
      try {
        exercise = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }
      
      if (!exercise || !exercise.name) {
        return res.status(400).json({ error: 'Exercise name is required' });
      }

      const newExercise = {
        ...exercise,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(newExercise);
      return res.status(201).json({ ...newExercise, _id: result.insertedId });
    }
    
    // Handle unsupported methods
    else {
      res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error in exercise handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 