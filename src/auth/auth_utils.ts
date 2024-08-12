import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../helpers/async_handler";
import { AuthFailureError, NotFoundError } from "../core/error_response";
import KeyTokenService from "../services/keyToken_service";
import crypto from 'crypto'
import JWT from "jsonwebtoken";

const HEADER = {
  CLIENT_ID: 'x-client-id',
  API_KEY: `x-api-key`,
  AUTHORIZATION: `authorization`
}

interface CustomRequest extends Request {
  keyStore?: any;
}

const authentication = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  // 1 - check userId missing 
  const userId = req.headers[HEADER.CLIENT_ID]?.toString()
  if (!userId) throw new AuthFailureError('Invalid Request')

  // 2 - get  accessToken and check user in dbs
  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found keyStore')

  // 3 - verifytoken
  const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString()
  if (!accessToken) throw new AuthFailureError('Invalid error')

  try {
    const publicKey = crypto.createPublicKey(req.body.publicKey)
    const decodeUser: any = JWT.verify(accessToken, publicKey)

    if (userId != decodeUser['user_id'])
      throw new AuthFailureError('Invalid Request')

    req.keyStore = keyStore
    return next()
  } catch (error) {
    throw error
  }
})

export {
  authentication
}
