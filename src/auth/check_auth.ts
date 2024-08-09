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
    // create new api key
    //const newApiKey = await new ApiKeyService().createApiKey(['read'])
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
  }
}


const checkPermissions = (permissions: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.objApiKey.permissions) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })
    }

    const validPermission = req.objApiKey.permissions.includes(permissions);
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
