import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image: string;
  types_customer: string;
  role: string;
  status_active: boolean;
  address: string;
  phone: string;
  create_date: Date;
  end_date: Date;
  state: string;
  google_id: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  first_name: { type: String, },
  last_name: { type: String, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // if register by google auto create password}
  phone: { type: String },
  image: { type: String },
  types_customer: { type: String },
  address: { type: String },
  role: { type: String, required: true }, // ?: don't need
  status_active: { type: Boolean, default: true }, // ?
  create_date: { type: Date, default: Date.now },
  end_date: { type: Date }, // => ban_date
  state: { type: String }, // ?
  google_id: { type: String }
});

const UserModel = mongoose.model<IUser>('User', userSchema)

export default UserModel
