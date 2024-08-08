
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDetail extends Document {
  order_id: mongoose.Schema.Types.ObjectId;
  product_id: mongoose.Schema.Types.ObjectId;
  current_price: number;
  quantity: number;
  create_date: Date;
  end_date: Date;
  state: boolean;
}

const orderDetailSchema: Schema<IOrderDetail> = new mongoose.Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  current_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  create_date: { type: Date, default: Date.now },
  end_date: { type: Date },
  state: { type: Boolean, default: true }
});

const OrderDetailModel = mongoose.model<IOrderDetail>('OrderDetail', orderDetailSchema);

export default OrderDetailModel;
