import apiKeyModel from "../models/apiKey_model"
import crypto from 'crypto'

class ApiKeyService {

  public async createApiKey(permissions:Array<string>) {
    try {
      const newKey = crypto.randomBytes(8).toString('hex')
      const newApiKey = new apiKeyModel({
        key: newKey,
        status: true,
        permissions: permissions
      })
      const saveApiKey = newApiKey.save()
      return saveApiKey

    } catch (error) {
      console.log(error)
    }
  }

  public static async findByKey(key: string) {
    const objKey = await apiKeyModel.findOne({ key: key, status: true }).lean()
    return objKey
  }
}

export default ApiKeyService
