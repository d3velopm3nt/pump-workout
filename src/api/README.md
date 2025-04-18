# Backend API Setup

This application requires a backend server to handle MongoDB connections. MongoDB is a server-side database and shouldn't be used directly in client-side code with Vite/React applications.

## Setup Instructions

1. Create a backend server using Node.js/Express or your preferred server framework
2. Implement the following API endpoints:

- `GET /api/exercises` - Get all exercises with optional filtering
- `GET /api/exercises/:id` - Get a specific exercise by ID
- `POST /api/exercises` - Create a new exercise
- `PATCH /api/exercises/:id` - Update an existing exercise
- `DELETE /api/exercises/:id` - Delete an exercise

## Example Express Server

```js
// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:tools@cluster0.fmstbx8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("fitness-app");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Get all exercises
app.get('/api/exercises', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('exercises');
    
    const query = {};
    
    if (req.query.muscleGroup) {
      query.muscleGroups = { $in: [req.query.muscleGroup] };
    }
    
    if (req.query.equipment) {
      query.equipment = { $in: [req.query.equipment] };
    }
    
    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }
    
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const exercises = await collection.find(query).toArray();
    res.json(exercises);
  } catch (error) {
    console.error('Error getting exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Implementation for other endpoints...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Development Instructions

1. Create a `.env` file to store your MongoDB connection string securely
2. In your Vite development setup, configure a proxy to forward API requests to your backend
3. For production, ensure proper CORS configuration and deployment of both client and server 