import { Request, Response } from "express"
import AuthService from "../services/auth_service"
import { CREATED, OK } from "../core/success_response"

class AuthControler {
  public async login(req: Request, res: Response) {
    new OK({
      message: 'Login success',
      metadata: await new AuthService().login(req.body)
    }).send(res)
  }

  public async register(req: Request, res: Response) {
    new CREATED({
      message: 'Registered OK!',
      metadata: await new AuthService().register(req.body)
    }).send(res)
  }
}

export default AuthControler
