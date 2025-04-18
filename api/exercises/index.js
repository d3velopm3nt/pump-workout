import { MongoClient } from 'mongodb';

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb+srv://admin:tools@cluster0.fmstbx8.mongodb.net/?retryWrites=true&w=majority";
let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB (with connection caching)
async function connectToDatabase() {
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

// Handler for /api/exercises endpoint
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET request - get all exercises
  if (req.method === 'GET') {
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
  
  // Handle POST request - create exercise
  else if (req.method === 'POST') {
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
  
  // Handle unsupported methods
  else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 