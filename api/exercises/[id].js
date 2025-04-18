import { MongoClient, ObjectId } from 'mongodb';

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

// Handler for /api/exercises/[id] endpoint
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get exercise ID from URL
  const { id } = req.query;
  
  // Validate ID
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid exercise ID' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    // GET request - get exercise by ID
    if (req.method === 'GET') {
      const exercise = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!exercise) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
      
      res.status(200).json(exercise);
    }
    
    // PATCH request - update exercise
    else if (req.method === 'PATCH') {
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
    }
    
    // DELETE request - delete exercise
    else if (req.method === 'DELETE') {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
      
      res.status(200).json({ success: true });
    }
    
    // Unsupported method
    else {
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE', 'OPTIONS']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error(`Error handling ${req.method} request for exercise ID ${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 