# Deploying to Vercel

This application is designed to be deployed to Vercel with both the frontend and API in a single project.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a cluster set up

## Environment Setup

Before deploying, you should set up the following environment variables in your Vercel project:

- `MONGODB_URI`: Your MongoDB connection string

## Deployment Steps

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. For production deployment:
   ```
   vercel --prod
   ```

## How It Works

The project is configured to work with Vercel's serverless architecture:

- The `/api` directory contains serverless functions that handle the MongoDB operations
- The frontend code in `/src` is built with Vite
- The `vercel.json` file configures the build process and routing

## Local Development

For local development, run:

```
npm run dev
```

This will start the Vite development server. The API calls will be directed to the `/api` endpoints, which you can handle using a local server or by using Vercel's development mode:

```
vercel dev
```

This will simulate the Vercel production environment locally, including serverless functions.

## Important Notes

1. **MongoDB Connection**: The MongoDB connection is established in the serverless functions, not in the frontend code. This is important for security and performance.

2. **API Routes**: All API routes are prefixed with `/api` and are handled by the serverless functions.

3. **Environment Variables**: Sensitive information like the MongoDB connection string should be stored in environment variables, not in the code. 