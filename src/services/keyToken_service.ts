import JWT from 'jsonwebtoken'
import KeyTokenModel from '../models/keyToken_model'
import mongoose from 'mongoose'

class KeyTokenService {
  public async save(user_id: mongoose.Types.ObjectId, refreshToken: string) {
    try {
      const newKeyToken = new KeyTokenModel({
        user_id,
        refreshToken,
        refreshTokensUsed: [],
      });

      const savedKeyToken = await newKeyToken.save();
      return savedKeyToken;
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
}

export default KeyTokenService
