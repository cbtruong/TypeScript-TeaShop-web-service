import mongoose, { Schema } from "mongoose";

export interface ICategory extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  state: boolean;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema({
  name: { type: String },
  state: { type: Boolean } // ? => don't need
})

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema)

export default CategoryModel
