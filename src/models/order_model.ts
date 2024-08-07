
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user_model';


export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: IUser['_id'];
  recipient_address: string;
  recipient_phone_number: string;
  status_order: string;
  payment_methods: string;
  note: string;
  total_amount: number;
  create_date: Date;
  state: string;
}

const orderSchema: Schema<IOrder> = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  recipient_address: { type: String, required: true },
  recipient_phone_number: { type: String, required: true },
  status_order: { type: String, required: true },
  payment_methods: { type: String, required: true },
  note: { type: String },
  total_amount: { type: Number, required: true },
  create_date: { type: Date, default: Date.now },
  state: { type: String, required: true }
});

const OrderModel = mongoose.model<IOrder>('Order', orderSchema);

export default OrderModel;
