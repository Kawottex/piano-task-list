import { Schema, model } from 'mongoose';
import type{ Task } from '@piano-task-list/shared';

const taskSchema = new Schema<Task>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
}, {
    toJSON: { virtuals: true }
});

export default model<Task>('Task', taskSchema);