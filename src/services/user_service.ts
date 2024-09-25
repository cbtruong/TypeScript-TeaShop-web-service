import UserModel, { IUser, IUserAbout, IUserAdress, UserAboutModel, UserAddressModel } from "../models/user_model"
import { extractUsernameFromEmail } from "../untils/email/emailUntil"
import bcrypt from 'bcrypt'
import { deleteFile } from "../untils"
import { deleteOnDrive } from "../configs/googleDriveAPI_config"

class UserService {

  public static async getRole(user_id: string) {
    const currentUser = await UserService.findUserById(user_id)
    return currentUser?.role
  }

  public async createNewUser({ first_name = '', last_name = '', email = null, password = '', image = '', types_customer = 'REGULAR', role = 'user', address = '', phone = '', state = '', google_id = '' }: any) {
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
      google_id: google_id,
      title: "",
    })

    const saveUser = await newUser.save()
    return saveUser
  }

  public static async uploadAvatar(user_id: string, file_name: string, fileID: any) {
    const infoUser = await this.findUserById(user_id)
    await deleteOnDrive([String(infoUser?.image)])
    deleteFile([`upload/${file_name}`])
    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { image: fileID },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      filePath: `https://drive.google.com/thumbnail?id=${fileID}`
    }
  }


  public static async getMyAccount(user_id: string) {
    const currentUser = await this.findUserById(user_id);
    return {
      lastName: currentUser?.last_name,
      firstName: currentUser?.first_name,
      title: currentUser?.title,
      numberPhone: currentUser?.phone
    };
  }

  public static async updateAccount(user_id: string, data: any) {
    const updateAccount = await UserModel.findOneAndUpdate({ _id: user_id },
      {
        last_name: data.lastName,
        first_name: data.firstName,
        title: data.title,
        phone: data.phone
      }).lean()
    return this.getMyAccount(user_id)
  }

  public static async findUserByGoogleId(google_id: string) {
    const user = await UserModel.findOne({ google_id }).lean()
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

export class UserAddressServices {
  public static async getAddress(user_id: string) {
    const addressList = await UserAddressModel.find({ user_id }).lean()
    return addressList || undefined
  }

  public static async addAddress(data: IUserAdress) {
    const newAddress = new UserAddressModel(data)
    const saveAddress = await newAddress.save()
    return saveAddress
  }


  public static async updateAddress(address_id: string, data: IUserAdress) {
    const updatedAddress = await UserAddressModel.findOneAndUpdate({ _id: address_id }, data, { new: true }).lean();
    return updatedAddress || undefined;
  }

  public static async deleteAddress(address_id: string) {
    return await UserAddressModel.deleteOne({ _id: address_id })
  }
}

export class UserAboutServices {
  public static async uploadAbout(data: IUserAbout) {
    return await UserAboutModel.findOneAndUpdate(
      { user_id: data.user_id },
      { sessions: data.sessions },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean()
  }

  public static async getAbout(user_id: string) {
    const userAboutData = await UserAboutModel.findOne({ user_id: user_id })
    return userAboutData
  }
}
export default UserService
