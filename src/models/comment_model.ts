
import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  user_id: mongoose.Schema.Types.ObjectId
  product_id: mongoose.Schema.Types.ObjectId
  blog_id: mongoose.Schema.Types.ObjectId
  content: string;
  create_date: Date;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blog_id: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  content: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);

export default CommentModel;
