import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import { seedDatabase } from './seed';
import taskRoutes from './routes/task.routes';

async function startServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    mongoose.connect(mongoUri)
    .then(() => app.listen(3000, () => console.log('✅ MongoDB connected, server running on port 3000')))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));

    await seedDatabase();
}

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/api/tasks', taskRoutes);

startServer();