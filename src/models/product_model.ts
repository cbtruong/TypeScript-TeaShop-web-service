
import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category_model";

export interface IProduct extends Document {
  name: string;
  price: number;
  cost: number;
  description: string;
  size: Array<string>;
  category: mongoose.Schema.Types.ObjectId; // Reference Category model's _id
  quantity: number;
  ingredient: Array<string>;
  fits: Array<string>;
  branchs: string; // Consider using an array if representing multiple branches
  certification: string;
  user_manual: string;
  create_date: Date;
  expiry: Date; // Renamed for clarity
  state: boolean;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  description: { type: String, required: true }, // Add 'required: true'
  size: { type: [String], default: [], required: true }, // Use type array
  category: { type: Schema.Types.ObjectId, ref: 'Categories', required: true },
  quantity: { type: Number, required: true },
  ingredient: { type: [String], default: [], required: true }, // Use type array
  fits: { type: [String], default: [], required: true },  // Use type array
  branchs: { type: String, required: true },  // Consider array for multiple branches
  certification: { type: String },
  user_manual: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
  expiry: { type: Date }, // Renamed for clarity
  state: { type: Boolean, required: true }, // Use Boolean type
});

const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel

