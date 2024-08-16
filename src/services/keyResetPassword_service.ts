import { Types } from "mongoose";
import KeyResetPasswordMoel from "../models/keyResetPassword_model";
import crypto from 'crypto'

class KeyResetPasswordService {

  public async create(userId: Types.ObjectId) {
    return await KeyResetPasswordMoel.create({
      userId: userId,
      token: crypto.randomBytes(32).toString('hex')
    })
  }

  public static async findByUserId(userId: Types.ObjectId) {
    return await KeyResetPasswordMoel.findOne({ userId: userId }).lean()
  }

  public static async findByUserIdAndToken(userId: string, token: string) {
    return await KeyResetPasswordMoel.findOne({
      userId: userId,
      token: token
    }).lean()
  }

  public static async deleteByUserId(userId: string) {
    return await KeyResetPasswordMoel.deleteOne({ userId: userId }).lean()
  }
}

export default KeyResetPasswordService
