import express from 'express';
import { getTasks, createTask } from '../controllers/task.controller';

const router = express.Router();

router.get('/', getTasks);

router.post('/', createTask);

export default router;