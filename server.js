import express from 'express';
import cors from 'cors';
import apiHandler from './api/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exercisesRouter from './api/exercises/index.js';
import logsRouter from './api/logs/index.js';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Create router for /api/exercises
const router = express.Router();

// Middleware to modify the URL for the API handler
router.use((req, res, next) => {
  // Remove /api/exercises from the URL
  req.url = req.url.replace(/^\/api\/exercises/, '');
  if (!req.url.startsWith('/')) req.url = '/' + req.url;
  next();
});

// GET /api/exercises
app.get('/api/exercises', async (req, res) => {
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
});

// GET /api/exercises/:id
app.get('/api/exercises/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid exercise ID' });
    }

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
});

// POST /api/exercises
app.post('/api/exercises', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const exercise = req.body;
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
    res.status(500).json({ error: 'Failed to create exercise' });
  }
});

// PATCH /api/exercises/:id
app.patch('/api/exercises/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid exercise ID' });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const updates = {
      ...req.body,
      updatedAt: new Date()
    };
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    
    res.status(200).json(result.value);
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({ error: 'Failed to update exercise' });
  }
});

// DELETE /api/exercises/:id
app.delete('/api/exercises/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid exercise ID' });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('exercises');
    
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) });
    
    if (!result.value) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
});

// Logs routes
app.use('/api/logs', (req, res, next) => {
  // Modify URL for API handler
  req.url = req.url.replace(/^\/api\/logs/, '');
  console.log(`[${new Date().toISOString()}] ${req.method} /api/logs${req.url}`);
  next();
}, logsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
}); 