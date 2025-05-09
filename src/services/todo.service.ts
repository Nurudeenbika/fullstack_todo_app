import Todo, { TodoDocument } from '../models/todo.model';

class TodoService {
  async createTodo(title: string, description: string | undefined, userId: string): Promise<TodoDocument> {
    const todo = new Todo({ title, description, userId });
    return todo.save();
  }

  async getTodos(userId: string): Promise<TodoDocument[]> {
    return Todo.find({ userId }).sort({ createdAt: -1 });
  }

  async getTodoById(id: string, userId: string): Promise<TodoDocument | null> {
    return Todo.findOne({ _id: id, userId });
  }

  async updateTodo(id: string, userId: string, updateData: Partial<TodoDocument>): Promise<TodoDocument | null> {
    return Todo.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
  }

  async deleteTodo(id: string, userId: string): Promise<TodoDocument | null> {
    return Todo.findOneAndDelete({ _id: id, userId });
  }
}

export default new TodoService();