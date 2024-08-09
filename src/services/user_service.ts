import UserModel, { IUser } from "../models/user_model"
import { extractUsernameFromEmail } from "../untils/email/emailUntil"
import bcrypt from 'bcrypt'

class UserService {
  public async createNewUser({ first_name = '', last_name = '', email, password, image = '', types_customer = 'REGULAR', role = 'CUSTOMER', address = '', phone = '', state = '', google_id = '' }: any) {
    const newUser = new UserModel({
      first_name: first_name || extractUsernameFromEmail(email),
      last_name: last_name,
      email: email,
      password: await bcrypt.hash(password, 10),
      image: image,
      types_customer: types_customer,
      role: role,
      status_active: true, // Giữ nguyên kiểu boolean
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



  public static async findUserByEmail(email: string) {
    const user = await UserModel.findOne({ email: email }).lean()
    return user
  }
}
export default UserService
