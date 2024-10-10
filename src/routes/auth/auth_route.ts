import express, { Response, Request } from "express";
import { asyncHandler } from "../../helpers/async_handler";
import { authentication } from "../../auth/auth_utils";
import AuthControler from "../../controllers/auth_controller";
import passport from "passport";
import '../../configs/passport_config' // config passport

const router = express.Router()


interface User {
  metadata: {
    accessToken: string;
    refreshToken: string;
  };
}

router.post('/register', asyncHandler(new AuthControler().register))

router.post('/login', asyncHandler(new AuthControler().login))//reset password with token 

router.post('/password/resetWithToken', asyncHandler(new AuthControler().resetPasswordWithToken))

router.post('/password/forgot', asyncHandler(new AuthControler().passwordForgot))

router.post('/password/reset', authentication, asyncHandler(new AuthControler().passwordReset))

// login with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));




router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    const user: any = req.user as User
    const accessToken = user.metadata.tokens.accessToken;
    const refreshToken = user.metadata.tokens.refreshToken;
    // Redirect to the frontend with user info and tokens
    res.redirect(`http://localhost:5173/auth/login?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  }
);



router.post('/logout', authentication, asyncHandler(new AuthControler().logout))

router.post('/token', asyncHandler(new AuthControler().checkToken))

export default router
