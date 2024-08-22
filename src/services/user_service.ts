import UserModel, { IUser } from "../models/user_model"
import { extractUsernameFromEmail } from "../untils/email/emailUntil"
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from "path"

class UserService {
  public async createNewUser({ first_name = '', last_name = '', email = null, password = '', image = '', types_customer = 'REGULAR', role = 'CUSTOMER', address = '', phone = '', state = '', google_id = '' }: any) {
    const newUser = new UserModel({
      first_name: first_name || extractUsernameFromEmail(email),
      last_name: last_name,
      email: email || google_id,
      password: password == '' ? await bcrypt.hash(google_id, 10) : await bcrypt.hash(password, 10),
      image: image,
      types_customer: types_customer,
      role: role,
      status_active: true,
      address: address,
      phone: phone,
      create_date: new Date(),
      end_date: new Date(),
      state: state,
      google_id: google_id
    })

    const saveUser = await newUser.save()
    return saveUser
  }

  public static async uploadAvatar(user_id: string, fileName: string) {
    const userInfo = await UserService.findUserById(user_id)
    // get file path
    const oldFilePath = `./dist/src/uploads/${userInfo?.image}`;
    // delete old file
    fs.unlink(oldFilePath, () => { })

    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { image: fileName },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      filePath: process.env.BASE_URL_BACKEND + '/images/' + fileName
    }
  }

  public static async findUserByGoogleId(google_id: string) {
    const user = await UserModel.findOne({ google_id })
    return user
  }

  public static async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email: email }).lean()
    return user
  }

  public static async findUserById(user_id: string) {
    const user = await UserModel.findOne({ _id: user_id }).lean()
    return user
  }

  public static async updatePassword({ user_id, newPassword }: { user_id: string, newPassword: string }) {
    const passwordHash = await bcrypt.hash(newPassword, 10)
    return await UserModel.findOneAndUpdate({ _id: user_id }, { password: passwordHash }, {}).lean()
  }
}
export default UserService
