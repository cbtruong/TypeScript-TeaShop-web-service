import mongoose, { Schema } from "mongoose";

export interface IVouchers extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  type: string;
  discount_percent: number;
  discount_value: number;
  min_cart_value: number;
  start_date: Date;
  end_date: Date;
}

const voucherSchema: Schema<IVouchers> = new mongoose.Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  discount_percent: { type: Number, require: true },
  discount_value: { type: Number, require: true },
  min_cart_value: { type: Number, require: true },
  start_date: { type: Date, require: true },
  end_date: { type: Date }
})

const VoucherModel = mongoose.model<IVouchers>('Voucher', voucherSchema)

export default VoucherModel
