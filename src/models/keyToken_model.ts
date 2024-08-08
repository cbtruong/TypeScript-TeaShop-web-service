
import mongoose from 'mongoose';

export interface IKeyToken {
  user_id: mongoose.Schema.Types.ObjectId;
  refreshToken: string;
  refreshTokensUsed: string[];
}

const KeyTokenSchema = new mongoose.Schema<IKeyToken>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshToken: {
    type: String,
    required: true
  },
  refreshTokensUsed: {
    type: [String],
    default: []
  }
});

const KeyTokenModel = mongoose.model('KeyTokens', KeyTokenSchema);

export default KeyTokenModel;
