import express, { Response, Request } from "express";
import { asyncHandler } from "../../helpers/async_handler";
import { authentication } from "../../auth/auth_utils";
import AuthControler from "../../controllers/auth_controller";
import passport from "passport";
import '../../configs/passport_config' // config passport

const router = express.Router()

/**
 * @swagger
 * paths:
 *   /auth/register:
 *     post:
 *       summary: Register a new user with a local password
 *       description: Registers a new user with a username and password.
 *       tags:
 *         - Auth
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: John
 *                 last_name:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User registered successfully
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *         400:
 *           description: Bad request, invalid input
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Invalid input
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Internal server error
 */
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
