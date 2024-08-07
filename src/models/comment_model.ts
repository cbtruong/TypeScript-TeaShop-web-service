
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './product_model';
import { IUser } from './user_model';

export interface IComment extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: IUser['_id'];
  product_id: IProduct['_id'];
  blog_id: IProduct['_id'];
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
