import UserModel, { IUser } from "../models/user_model"
import { extractUsernameFromEmail } from "../untils/email/emailUntil"
import bcrypt from 'bcrypt'

class UserService {
  public async createNewUser({ email, password }: { email: string, password: string }) {
    try {
      const newUser = new UserModel({
        first_name: extractUsernameFromEmail(email),
        last_name: '',
        email: email,
        password: await bcrypt.hash(password, 10),
        image: '',
        types_customer: 'REGULAR',
        role: 'CUSTOMER',
        status_active: true, // Giữ nguyên kiểu boolean
        address: '',
        phone: '',
        create_date: new Date(),
        end_date: new Date(),
        state: '',
        google_id: ''
      })

      const saveUser = await newUser.save()
      return saveUser

    } catch (error) {
      console.log(error)
    }
  }


  public static async findUserByEmail(email: string) {
    try {
      const user = await UserModel.findOne({ email: email }).lean()
      return user
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService
