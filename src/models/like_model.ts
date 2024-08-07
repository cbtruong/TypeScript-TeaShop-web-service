
import mongoose, { Schema, Document } from 'mongoose';
import { IBlog } from './blog_model';
import { IUser } from './user_model';

export interface ILike extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  blog_id: IBlog['_id'];
  user_id: IUser['_id'];
}

const likeSchema: Schema<ILike> = new mongoose.Schema({
  blog_id: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const LikeModel = mongoose.model<ILike>('Like', likeSchema);

export default LikeModel;
