import mongoose, { Schema } from "mongoose";
import { IUser } from "./user_model";
import { IVouchers } from "./voucher_model";

export interface IVoucherUser extends Document {
  user_id: mongoose.Schema.Types.ObjectId
  voucher_id: mongoose.Schema.Types.ObjectId
}

const voucherUserSchema: Schema<IVoucherUser> = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  voucher_id: { type: Schema.Types.ObjectId, ref: 'Voucher' }
})

const VouchersUserModel = mongoose.model<IVoucherUser>('VoucherUser', voucherUserSchema)

export default VouchersUserModel
