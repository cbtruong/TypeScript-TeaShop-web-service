import JWT from 'jsonwebtoken'
import KeyTokenModel from '../models/keyToken_model'
import mongoose, { deleteModel, ObjectId, Types } from 'mongoose'

class KeyTokenService {
  public async save(user_id: mongoose.Types.ObjectId, refreshToken: string) {
    try {
      const filter = { user_id }
      const update = { user_id, refreshToken }
      const option = { new: true, upsert: true }

      const updateKey = await KeyTokenModel.findOneAndUpdate(filter, update, option)

      return updateKey
    } catch (error) {
      console.error(error);
    }
  }

  public async create(payload: object, privateKey: string) {
    try {
      const accessToken = JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '2 days'
      })

      const refreshToken = JWT.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7 days'
      })

      return { accessToken, refreshToken }
    } catch (error) {
      console.log(error)
    }
  }

  static async findByUserId(userId: string) {
    return await KeyTokenModel.findOne({ user_id: userId }).lean()
  }

  static async removeById(id: string) {
    return await KeyTokenModel.findByIdAndDelete(id)
  }
}

export default KeyTokenService
