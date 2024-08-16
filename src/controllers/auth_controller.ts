import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth_service"
import { CREATED, OK } from "../core/success_response"
import { verify } from "../auth/auth_utils"


interface CustomRequest extends Request {
  keyStore?: any;
  newPassword?: string;
  currentPassword?: string;
  user_id?: string
}

class AuthControler {
  public async checkToken(req: Request, res: Response) {
    const { publicKey, refreshToken } = req.body
    const decode: any = verify(refreshToken, publicKey)
    const user_id = decode.user_id
    new OK({
      message: 'Refresh Token success',
      metadata: await new AuthService().checkToken(refreshToken, user_id)
    }).send(res)
  }

  public async resetPasswordWithToken(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const token = req.query.token as string;
    const password = req.body.password;

    new OK({
      message: 'Reset password success',
      metadata: await new AuthService().resetPasswordWithToken(user_id, token, password)
    }).send(res)

  }

  public async passwordForgot(req: Request, res: Response) {
    new OK({
      message: 'Send mail success',
      metadata: await new AuthService().passwordForgot(req.body.email)
    }).send(res)
  }

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
