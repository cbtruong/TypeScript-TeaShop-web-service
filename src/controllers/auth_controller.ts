import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth_service"
import { CREATED, OK } from "../core/success_response"

interface CustomRequest extends Request {
  keyStore?: any;
  newPassword?: string;
  currentPassword?: string;
  user_id?: string
}

class AuthControler {
  public async passwordReset(req: CustomRequest, res: Response) {
    new OK({
      message: 'Reset password success',
      metadata: await new AuthService().passwordReset({ newPassword: req.body.newPassword, currentPassword: req.body.currentPassword, user_id: req.keyStore.user_id })
    }).send(res)
  }

  public async logout(req: CustomRequest, res: Response, next: NextFunction) {
    req.logout(async (err) => {
      if (err) {
        return next(err);
      }
      new OK({
        message: 'Logout success',
        metadata: await new AuthService().logout(req.keyStore) || undefined
      }).send(res);

    });
  }


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
