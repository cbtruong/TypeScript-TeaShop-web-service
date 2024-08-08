import mongoose, { Schema } from "mongoose";

export interface IImagesProduct extends Document {
  product_id: mongoose.Schema.Types.ObjectId;
  url: string;
  description: string;
  upload_date: Date;
  state: boolean;
}

const imagesProductSchema: Schema<IImagesProduct> = new mongoose.Schema({
  product_id: { type: Schema.Types.ObjectId, require: true },
  url: { type: String, require: true },
  description: { type: String },
  upload_date: { type: Date, default: Date.now },
  state: { type: Boolean, require: true }
})

const ImagesProductModel = mongoose.model<IImagesProduct>('ImageProduct', imagesProductSchema)

export default ImagesProductModel
