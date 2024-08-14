import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../helpers/async_handler";
import { AuthFailureError, NotFoundError } from "../core/error_response";
import KeyTokenService from "../services/keyToken_service";
import crypto from 'crypto'
import JWT from "jsonwebtoken";

const HEADER = {
  API_KEY: `x-api-key`,
  AUTHORIZATION: `authorization`
}

interface CustomRequest extends Request {
  keyStore?: any;
}

const authentication = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  // 1 - verifytoken
  const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString()
  if (!accessToken) throw new AuthFailureError('Invalid error')

  const publicKey = crypto.createPublicKey(req.body.publicKey)
  const decodeUser: any = JWT.verify(accessToken, publicKey)

  // 2 - check userId missing 
  const userId = decodeUser.user_id
  if (!userId) throw new AuthFailureError('Invalid Request')

  // 3 - get  accessToken and check user in dbs
  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found keyStore')


  req.keyStore = keyStore
  return next()
})

const verify = (token: string, publicKey: string) => {
  const decode = JWT.verify(token, publicKey);
  return decode
}

export {
  authentication,
  verify
}
