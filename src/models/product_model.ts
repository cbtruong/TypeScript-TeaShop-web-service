
import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  productImages: Array<string>;
}

export interface ITea extends IProduct {
  collections: Array<string>;
  sizes: Array<string>;
}

export interface IExtra extends IProduct {
  colors: Array<string>;
}

const TeaSchema = new Schema<ITea>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  productImages: { type: [String], required: true },
  collections: { type: [String], required: true },
  sizes: { type: [String], required: true }
}, { timestamps: true });

const ExtraSchema = new Schema<IExtra>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  productImages: { type: [String], required: true },
  colors: { type: [String], required: true }
}, { timestamps: true });

const ExtraModel = mongoose.model<IExtra>("Extra", ExtraSchema);
const TeaModel = mongoose.model<ITea>("Tea", TeaSchema);



export {
  TeaModel, ExtraModel
}
