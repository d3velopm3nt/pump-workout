import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:tools@cluster0.fmstbx8.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

let isConnected = false;

export async function connectToDatabase() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return client.db("fitness-app");
}

// Handle cleanup on app shutdown
process.on('SIGINT', async () => {
  if (isConnected) {
    await client.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  }
});

export { client }; 