import express, { Response, Request } from "express";
import { asyncHandler } from "../../helpers/async_handler";
import { authentication } from "../../auth/auth_utils";
import AuthControler from "../../controllers/auth_controller";
import passport from "passport";

const router = express.Router()

// login with local
router.post('/auth/register', asyncHandler(new AuthControler().register))
router.post('/auth/login', asyncHandler(new AuthControler().login))

// forgot password 
router.post('/auth/password/forgot', asyncHandler(new AuthControler().passwordForgot))


// config passport
import '../../configs/passport_config'

// login with google
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// logout
router.post('/auth/logout', authentication, asyncHandler(new AuthControler().logout))
router.post('/auth/password/reset', authentication, asyncHandler(new AuthControler().passwordReset))

// check token
router.post('/auth/token', asyncHandler(new AuthControler().checkToken))

export default router
