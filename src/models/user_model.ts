import mongoose, { mongo, Schema } from "mongoose";

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
  title: string;
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
  google_id: { type: String },
  title: { type: String }
});

export interface IUserAdress extends Document {
  user_id: mongoose.Types.ObjectId;
  first_name: string;
  last_name: string;
  company_name: string;
  address_first: string;
  address_second?: string;
  city: string;
  country: string;
  zip_code: string;
  number_phone: string;
}

const UserAddressSchema: Schema<IUserAdress> = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  first_name: { type: String },
  last_name: { type: String },
  company_name: { type: String },
  address_first: { type: String },
  address_second: { type: String },
  city: { type: String },
  country: { type: String },
  zip_code: { type: String },
  number_phone: { type: String }
})


export interface ISection {
  type: 'text' | 'image' | 'video';
  content?: string;
  url?: string;
  iframe?: string;
}

export interface IUserAbout {
  user_id: mongoose.Types.ObjectId;
  sessions: ISection[];
}

const SectionSchema: Schema<ISection> = new Schema({
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  content: { type: String },
  url: { type: String },
});

const UserAboutSchema: Schema<IUserAbout> = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  sessions: [SectionSchema]
});

const UserModel = mongoose.model<IUser>('User', userSchema)
export const UserAddressModel = mongoose.model<IUserAdress>("UserAddress", UserAddressSchema)
export const UserAboutModel = mongoose.model<IUserAbout>("UserAbout", UserAboutSchema)
export default UserModel

