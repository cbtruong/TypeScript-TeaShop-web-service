import JWT from 'jsonwebtoken'
import KeyTokenModel from '../models/keyToken_model'
import mongoose, { deleteModel, ObjectId, Types } from 'mongoose'

class KeyTokenService {
  public async save(user_id: mongoose.Types.ObjectId, refreshToken: string) {
    try {
      const filter = { user_id }
      const update = { user_id, refreshToken, refreshTokensUsed: [] }
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

  static async saveRefreshTokenUsed(oldToken: string, newToken: string) {
    return await KeyTokenModel.updateOne(
      { refreshToken: oldToken },
      {
        $set: { refreshToken: newToken },
        $addToSet: { refreshTokensUsed: oldToken }
      }
    ).lean()
  }

  static async findByUserId(userId: string) {
    return await KeyTokenModel.findOne({ user_id: userId }).lean()
  }

  static async findByToken(token: string) {
    return await KeyTokenModel.findOne({ refreshToken: token }).lean()
  }

  static async findInRefreshTokenUsed(token: string) {
    return await KeyTokenModel.findOne({ refreshTokensUsed: { $in: [token] } });
  }

  static async removeById(id: string) {
    return await KeyTokenModel.findByIdAndDelete(id)
  }


  static async deleteByUserId(user_id: string) {
    console.log(user_id)
    const result = await KeyTokenModel.deleteOne({ user_id: new Types.ObjectId(user_id) });
    return result.deletedCount > 0; // Trả về true nếu xóa thành công
  }
}

export default KeyTokenService
