import mongoose, { Schema, Document } from 'mongoose';

export interface TodoDocument extends Document {
  title: string;
  description?: string;
  completed: boolean;
  userId: mongoose.Schema.Types.ObjectId; // Link to the User model
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<TodoDocument>('Todo', TodoSchema);