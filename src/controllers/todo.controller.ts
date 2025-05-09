import { Request, Response } from 'express';
import TodoService from '../services/todo.service';
import { ApiResponse } from '../utils/apiResponse';

class TodoController {
  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const userId = req.userId!; // Authenticate middleware ensures this exists
      const todo = await TodoService.createTodo(title, description, userId);
      res.status(201).json(new ApiResponse(todo, 'Todo created successfully', true));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(null, error.message, false));
    }
  }

  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const todos = await TodoService.getTodos(userId);
      res.status(200).json(new ApiResponse(todos, 'Todos retrieved successfully', true));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(null, error.message, false));
    }
  }

  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const todo = await TodoService.getTodoById(id, userId);
      if (!todo) {
        res.status(404).json(new ApiResponse(null, 'Todo not found', false));
        return;
      }
      res.status(200).json(new ApiResponse(todo, 'Todo retrieved successfully', true));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(null, error.message, false));
    }
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const userId = req.userId!;
      const updatedTodo = await TodoService.updateTodo(id, userId, { title, description, completed });
      if (!updatedTodo) {
        res.status(404).json(new ApiResponse(null, 'Todo not found', false));
        return;
      }
      res.status(200).json(new ApiResponse(updatedTodo, 'Todo updated successfully', true));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(null, error.message, false));
    }
  }

  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const deletedTodo = await TodoService.deleteTodo(id, userId);
      if (!deletedTodo) {
        res.status(404).json(new ApiResponse(null, 'Todo not found', false));
        return;
      }
      res.status(200).json(new ApiResponse({ _id: id }, 'Todo deleted successfully', true));
    } catch (error: any) {
      res.status(500).json(new ApiResponse(null, error.message, false));
    }
  }
}

export default new TodoController();