import { Schema, model } from 'mongoose';
import type { Task } from '@piano-task-list/shared';

const taskSchema = new Schema<Task>({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

export default model<Task>('TaskModel', taskSchema);