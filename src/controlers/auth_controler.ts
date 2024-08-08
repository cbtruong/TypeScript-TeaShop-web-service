import { Request, Response } from "express"
import AuthService from "../services/auth_service"

class AuthControler {
  public async register(req: Request, res: Response) {
    try {
      return res.status(201).json(await new AuthService().register(req.body))
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error'
      })
    }
  }
}

export default AuthControler
