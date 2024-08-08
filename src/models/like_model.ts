
import mongoose, { Schema, Document } from 'mongoose';

export interface ILike extends Document {
  blog_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
}

const likeSchema: Schema<ILike> = new mongoose.Schema({
  blog_id: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const LikeModel = mongoose.model<ILike>('Like', likeSchema);

export default LikeModel;
