// Main API router for Vercel deployment
import { MongoClient, ObjectId } from 'mongodb';

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://admin:tools@cluster0.fmstbx8.mongodb.net/?retryWrites=true&w=majority";
const dbName = process.env.MONGODB_DB || "pump";
let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB (with connection caching)
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  
  cachedClient = client;
  cachedDb = db;
  
  console.log('Connected to MongoDB successfully');
  return { client, db };
}

// Main handler for all API requests
export default async function handler(req, res) {
  console.log('API Handler received request:', {
    method: req.method,
    url: req.url,
    path: req.path,
    params: req.params,
    query: req.query,
    body: req.body
  });

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

  try {
    // Handle GET /api/exercises
    if (req.method === 'GET' && !req.params.id) {
      return await getExercisesHandler(req, res);
    }
    
    // Handle POST /api/exercises
    if (req.method === 'POST' && !req.params.id) {
      return await createExerciseHandler(req, res);
    }
    
    // Handle routes with ID parameter
    if (req.params.id) {
      const id = req.params.id;
      
      if (req.method === 'GET') {
        return await getExerciseByIdHandler(req, res, id);
      }
      
      if (req.method === 'PATCH') {
        return await updateExerciseHandler(req, res, id);
      }
      
      if (req.method === 'DELETE') {
        return await deleteExerciseHandler(req, res, id);
      }
    }

    // If no route matches
    console.log('No matching route found');
    return res.status(404).json({ error: 'Not Found' });
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler functions for each API endpoint
async function getExercisesHandler(req, res) {
  console.log('Handling GET exercises request');
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
    
    console.log('Executing MongoDB query:', query);
    const exercises = await collection.find(query).toArray();
    console.log(`Found ${exercises.length} exercises`);
    
    return res.status(200).json(exercises);
  } catch (error) {
    console.error('Error getting exercises:', error);
    return res.status(500).json({ error: 'Failed to fetch exercises' });
  }
}

async function createExerciseHandler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    let exercise;
    try {
      exercise = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
      return res.status(400).json({ error: 'Invalid request body format' });
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
    res.status(201).json({ ...newExercise, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating exercise:', error);
    res.status(500).json({ error: 'Failed to create exercise', details: error.message });
  }
}

async function getExerciseByIdHandler(req, res, id) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
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