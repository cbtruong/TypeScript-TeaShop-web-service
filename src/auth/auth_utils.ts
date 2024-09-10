import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../helpers/async_handler";
import { AuthFailureError, NotFoundError } from "../core/error_response";
import KeyTokenService from "../services/keyToken_service";
import crypto from 'crypto'
import JWT from "jsonwebtoken";
import UserService from "../services/user_service";

const HEADER = {
  API_KEY: `x-api-key`,
  ACCESS_TOKEN: `authorization`,
  PUBLIC_KEY: `public-key`
}

interface CustomRequest extends Request { keyStore?: any; roleAccount?: any }

const checkRole = (roles: Array<string>) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.roleAccount) {
      return res.status(401).json({
        message: 'Forbidden Error',
      })

    }
    if (!roles.includes(req.roleAccount)) {
      return res.status(401).json({
        message: 'Permission denied',
      })
    }

    return next()
  }
}

const authentication = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  // 1 - verifytoken console.log(req.headers)
  const accessToken = req.headers[HEADER.ACCESS_TOKEN]?.toString()
  if (!accessToken) throw new AuthFailureError('Invalid error 1')

  let publicKeyString = req.headers[HEADER.PUBLIC_KEY]?.toString()
  if (!publicKeyString) throw new AuthFailureError('Public key not found');

  // Remove unnecessary line breaks and whitespace
  publicKeyString = publicKeyString.replace(/\\n/gm, '\n');

  const publicKey = crypto.createPublicKey(publicKeyString)

  const decodeUser: any = JWT.verify(accessToken, publicKey)


  // 2 - check userId missing 
  const userId = decodeUser.user_id
  if (!userId) throw new AuthFailureError('Invalid Request')

  // 3 - get  accessToken and check user in dbs
  const keyStoreUserId = await KeyTokenService.findByUserId(userId)
  if (!keyStoreUserId) throw new NotFoundError('Not found keyStore')

  // 4 - get role 
  const roleAccount = await UserService.getRole(userId)

  req.keyStore = keyStoreUserId
  req.roleAccount = roleAccount
  return next()
})

const verify = (token: string, publicKey: string) => {
  const decode = JWT.verify(token, publicKey);
  return decode
}

export {
  authentication,
  verify,
  checkRole
}
