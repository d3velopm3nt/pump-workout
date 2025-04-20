import express from 'express';
import cors from 'cors';
import apiHandler from './api/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Forward all /api requests to our API handler
app.use('/api', (req, res) => {
  return apiHandler(req, res);
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
}); 