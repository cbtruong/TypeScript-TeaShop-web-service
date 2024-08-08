import { Response, Request, NextFunction } from "express"
import ApiKeyService from "../services/apiKey_service"

const HEADER = {
  API_KEY: `x-api-key`,
  AUTHORIZATION: `authorization`
}

interface CustomRequest extends Request {
  objApiKey?: any;
}

const checkApiKey = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }

    // check apikey
    const objKey = await ApiKeyService.findByKey(key);
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }

    req.objApiKey = objKey;
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Server error'
    })
  }
}


const checkPermissions = (permissions: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.objApiKey.permissions)
    if (!req.objApiKey.permissions) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })
    }

    const validPermission = req.objApiKey.permissions.includes(permissions);
    console.log(validPermission)
    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }

    return next()
  }
}

export {
  checkApiKey, checkPermissions
}
