// src/seed.test.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedDatabase } from '../seed';
import TaskModel from '../models/Task';

let mongod: MongoMemoryServer;

beforeAll(async () => {
  // Start DB in memory
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
  // Cleanup DB
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  // Delete DB content
  await TaskModel.deleteMany({});
});

describe('seedDatabase', () => {
  it('should insert tasks in the database', async () => {
    await seedDatabase();

    const tasks = await TaskModel.find();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should insert tasks with the correct fields', async () => {
    await seedDatabase();

    const tasks = await TaskModel.find();
    tasks.forEach(task => {
      expect(task.title).toBeDefined();
      expect(task.description).toBeDefined();
    });
  });

  it('should clear existing tasks before seeding', async () => {
    // Insert deprecated data
    await TaskModel.insertMany([{ title: 'Old task', description: 'Old description' }]);

    await seedDatabase();

    const tasks = await TaskModel.find();
    // Verify there's no deprecated data anymore
    const hasOldTask = tasks.some(t => t.title === 'Old task');
    expect(hasOldTask).toBe(false);
  });
});