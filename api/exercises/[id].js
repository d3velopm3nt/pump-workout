import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../src/utils/mongodb';

// Handler for /api/exercises/[id] endpoint
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid exercise ID' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    const query = { _id: new ObjectId(id) };

    // Handle GET request - get single exercise
    if (req.method === 'GET') {
      const exercise = await collection.findOne(query);
      
      if (!exercise) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
      
      return res.status(200).json(exercise);
    }
    
    // Handle PUT/PATCH request - update exercise
    else if (req.method === 'PUT' || req.method === 'PATCH') {
      let updates;
      try {
        updates = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }

      updates = {
        ...updates,
        updatedAt: new Date()
      };
      
      const result = await collection.findOneAndUpdate(
        query,
        { $set: updates },
        { returnDocument: 'after' }
      );
      
      if (!result.value) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
      
      return res.status(200).json(result.value);
    }
    
    // Handle DELETE request
    else if (req.method === 'DELETE') {
      const result = await collection.findOneAndDelete(query);
      
      if (!result.value) {
        return res.status(404).json({ error: 'Exercise not found' });
      }
      
      return res.status(200).json({ message: 'Exercise deleted successfully' });
    }
    
    // Handle unsupported methods
    else {
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']);
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