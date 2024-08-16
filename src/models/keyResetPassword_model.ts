
import mongoose, { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const keyResetPasswordSchema: Schema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const KeyResetPasswordMoel = mongoose.model<IToken>('ResetPasswordToken', keyResetPasswordSchema);

export default KeyResetPasswordMoel;
