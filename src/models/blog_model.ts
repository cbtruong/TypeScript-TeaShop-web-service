
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  content: string;
  blog_status: string;
  create_date: Date;
  end_date: Date;
  view_total: number;
  comment_total: number;
  like_total: number;
}

const blogSchema: Schema<IBlog> = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  blog_status: { type: String, required: true }, // Define valid values like ['published', 'draft'] etc.
  create_date: { type: Date, default: Date.now },
  end_date: { type: Date },
  view_total: { type: Number, default: 0 },
  comment_total: { type: Number, default: 0 },  // Fixed typo: 'commnet_total'
  like_total: { type: Number, default: 0 }
});

const BlogModel = mongoose.model<IBlog>('Blog', blogSchema);

export default BlogModel;

