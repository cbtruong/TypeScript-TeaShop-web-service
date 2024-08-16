import express, { Response, Request } from "express";
import { asyncHandler } from "../../helpers/async_handler";
import { authentication } from "../../auth/auth_utils";
import AuthControler from "../../controllers/auth_controller";
import passport from "passport";
import '../../configs/passport_config' // config passport

const router = express.Router()

// register with local password
router.post('/auth/register', asyncHandler(new AuthControler().register))

// login with logcal password
router.post('/auth/login', asyncHandler(new AuthControler().login))//reset password with token 

router.post('/auth/password/resetWithToken', asyncHandler(new AuthControler().resetPasswordWithToken))

// send mail token link when user click forgot password
router.post('/auth/password/forgot', asyncHandler(new AuthControler().passwordForgot))

// reset password with oldPassword
router.post('/auth/password/reset', authentication, asyncHandler(new AuthControler().passwordReset))

// login with google
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback when finsh handler with google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// logout
router.post('/auth/logout', authentication, asyncHandler(new AuthControler().logout))

// Check the token when the token expires
router.post('/auth/token', asyncHandler(new AuthControler().checkToken))

export default router
