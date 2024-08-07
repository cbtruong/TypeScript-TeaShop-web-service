import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product_model";

export interface IImagesProduct extends Document {
  _id: mongoose.Types.ObjectId;
  tea_id: IProduct['_id'];
  url: string;
  description: string;
  upload_date: Date;
  state: boolean;
}

const imagesProductSchema: Schema<IImagesProduct> = new mongoose.Schema({
  tea_id: { type: Schema.Types.ObjectId, require: true },
  url: { type: String, require: true },
  description: { type: String },
  upload_date: { type: Date, default: Date.now },
  state: { type: Boolean, require: true }
})

const ImagesProductModel = mongoose.model<IImagesProduct>('ImageProduct', imagesProductSchema)

export default ImagesProductModel
