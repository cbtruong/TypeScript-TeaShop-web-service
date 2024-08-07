import mongoose, { Schema } from "mongoose";
import { IUser } from "./user_model";
import { IVouchers } from "./voucher_model";

export interface IVoucherUser extends Document {
  _id: mongoose.Types.ObjectId;
  user_id: IUser['_id']
  voucher_id: IVouchers['_id'];
}

const voucherUserSchema: Schema<IVoucherUser> = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  voucher_id: { type: Schema.Types.ObjectId, ref: 'Voucher' }
})

const VouchersUserModel = mongoose.model<IVoucherUser>('VoucherUser', voucherUserSchema)

export default VouchersUserModel
