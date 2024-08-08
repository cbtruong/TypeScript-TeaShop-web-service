
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user_model';

export interface IBlog extends Document {
  comment_id: mongoose.Schema.Types.ObjectId;
  user_id: IUser['_id'];
  title: string;
  description: string;
  content: string;
  blog_status: string;
  create_date: Date;
  end_date: Date;
}

const blogSchema: Schema<IBlog> = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment_id: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  blog_status: { type: String, required: true }, // ?
  create_date: { type: Date, default: Date.now },
  end_date: { type: Date }
});

const BlogModel = mongoose.model<IBlog>('Blog', blogSchema);

export default BlogModel;
