import { Request, Response } from 'express';
import TaskModel from '../models/Task';
import { buildTaskFilter } from '../filters/task.filter';

export async function getTasks(req: Request, res: Response) {
    const filter = buildTaskFilter();
    const tasks = await TaskModel.find(filter);
    const result = tasks.map((task) => {
        const obj = task.toObject();
        return obj;
    });
    res.json(result);
}

export async function createTask(req: Request, res: Response) {
    const taskData = req.body;
    const task = new TaskModel(taskData);
    try {
        const newTask = await task.save();
        console.log('✅ Task created:', newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('❌ Failed to create task:', error);
        res.status(400).json({ error: 'Failed to create task' });
    }
}
