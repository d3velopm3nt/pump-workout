// Main API router for Vercel deployment
import { MongoClient } from 'mongodb';
import { URL } from 'url';

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://admin:tools@cluster0.fmstbx8.mongodb.net/?retryWrites=true&w=majority";
let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB (with connection caching)
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("pump");
  
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

// Main handler for all API requests
export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Route to appropriate handler based on pathname
  if (pathname.startsWith('/api/exercises')) {
    if (pathname === '/api/exercises' && req.method === 'GET') {
      return await getExercisesHandler(req, res);
    } else if (pathname === '/api/exercises' && req.method === 'POST') {
      return await createExerciseHandler(req, res);
    } else if (pathname.match(/^\/api\/exercises\/[a-zA-Z0-9]+$/) && req.method === 'GET') {
      const id = pathname.split('/').pop();
      return await getExerciseByIdHandler(req, res, id);
    } else if (pathname.match(/^\/api\/exercises\/[a-zA-Z0-9]+$/) && req.method === 'PATCH') {
      const id = pathname.split('/').pop();
      return await updateExerciseHandler(req, res, id);
    } else if (pathname.match(/^\/api\/exercises\/[a-zA-Z0-9]+$/) && req.method === 'DELETE') {
      const id = pathname.split('/').pop();
      return await deleteExerciseHandler(req, res, id);
    }
  }

  // Handle 404 for all other routes
  res.status(404).json({ error: 'Not Found' });
}

// Handler functions for each API endpoint
async function getExercisesHandler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
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
    res.status(200).json(exercises);
  } catch (error) {
    console.error('Error getting exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
}

async function createExerciseHandler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const exercise = req.body;
    const newExercise = {
      ...exercise,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(newExercise);
    res.status(201).json({ ...newExercise, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating exercise:', error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
}

async function getExerciseByIdHandler(req, res, id) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const { ObjectId } = require('mongodb');
    const exercise = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    
    res.status(200).json(exercise);
  } catch (error) {
    console.error('Error getting exercise:', error);
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
}

async function updateExerciseHandler(req, res, id) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const { ObjectId } = require('mongodb');
    const exercise = req.body;
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...exercise,
          updatedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    
    res.status(200).json({ success: true, updatedCount: result.modifiedCount });
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({ error: 'Failed to update exercise' });
  }
}

async function deleteExerciseHandler(req, res, id) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const { ObjectId } = require('mongodb');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
} 