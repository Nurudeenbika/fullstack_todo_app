import express from 'express';
import TodoController from '../controllers/todo.controller';
import { authenticate } from '../middleware/auth.middleware';
import { RequestHandler } from 'express';

const router = express.Router();

//router.use(authenticate); // Apply authentication middleware to all todo routes
router.use(authenticate as RequestHandler);


// Use methods directly on the already-instantiated controller
router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodos);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export default router;
