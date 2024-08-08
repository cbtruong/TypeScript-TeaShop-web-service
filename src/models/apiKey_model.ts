import mongoose, { Schema } from "mongoose";

export interface IApiKey extends Document {
  key: string;
  status: boolean;
  permissions: Array<string>;
}

const apiKeySchema: Schema<IApiKey> = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
  permissions: { type: [String], required: true, enum: ['read', 'write', 'update', 'delete', 'admin'] }
})

const apiKeyModel = mongoose.model<IApiKey>('ApiKey', apiKeySchema)

export default apiKeyModel
