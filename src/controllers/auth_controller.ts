import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth_service"
import { CREATED, OK } from "../core/success_response"
import passport from "passport";

interface CustomRequest extends Request {
  keyStore?: any;
}

class AuthControler {
  public async googleLogin() {
    return passport.authenticate('google', { scope: ['profile'] })
  }

  public async googleCallBack(req: Request, res: Response) {
    return passport.authenticate('google', { failureRedirect: '/login' }),
      function() {
        // Successful authentication, redirect home.
        res.json({ message: 'Login success', user: req.user })
      }
  }


  public async logout(req: CustomRequest, res: Response, next: NextFunction) {
    req.logout(async (err) => {
      if (err) {
        return next(err);
      }
    });
    
    new OK({
      message: 'Logout success',
      metadata: await new AuthService().logout(req.keyStore) || undefined
    }).send(res);

  }


  public async login(req: Request, res: Response) {
    return new OK({
      message: 'Login success',
      metadata: await new AuthService().login(req.body)
    }).send(res)
  }

  public async register(req: Request, res: Response) {
    return new CREATED({
      message: 'Registered OK!',
      metadata: await new AuthService().register(req.body)
    }).send(res)
  }
}

export default AuthControler
