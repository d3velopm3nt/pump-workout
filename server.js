import express from 'express';
import cors from 'cors';
import apiHandler from './api/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exercisesRouter from './api/exercises/index.js';
import logsRouter from './api/logs/index.js';

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
router.get('/', async (req, res) => {
  console.log('GET all exercises');
  return await apiHandler(req, res);
});

// POST /api/exercises
router.post('/', async (req, res) => {
  console.log('POST new exercise');
  return await apiHandler(req, res);
});

// GET /api/exercises/:id
router.get('/:id', async (req, res) => {
  console.log('GET exercise by ID:', req.params.id);
  return await apiHandler(req, res);
});

// PATCH /api/exercises/:id
router.patch('/:id', async (req, res) => {
  console.log('PATCH exercise:', req.params.id);
  return await apiHandler(req, res);
});

// DELETE /api/exercises/:id
router.delete('/:id', async (req, res) => {
  console.log('DELETE exercise:', req.params.id);
  return await apiHandler(req, res);
});

// Mount the router at /api/exercises
app.use('/api/exercises', (req, res, next) => {
  // Modify URL for API handler
  req.url = req.url.replace(/^\/api\/exercises/, '');
  console.log(`[${new Date().toISOString()}] ${req.method} /api/exercises${req.url}`);
  next();
}, exercisesRouter);

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