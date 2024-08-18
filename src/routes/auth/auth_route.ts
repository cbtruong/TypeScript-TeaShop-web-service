import express, { Response, Request } from "express";
import { asyncHandler } from "../../helpers/async_handler";
import { authentication } from "../../auth/auth_utils";
import AuthControler from "../../controllers/auth_controller";
import passport from "passport";
import '../../configs/passport_config' // config passport

const router = express.Router()



/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new user
 *     description: Registers a new user with the provided email and password. The request requires both `x-api-key` and `authorization` headers.
 *     operationId: registerUser
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The user details required for registration.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nguyengiahau2004@gmail.com
 *               password:
 *                 type: string
 *                 example: '@Giahau123'
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                  example: Registered OK!
 *                status: 
 *                  type: number
 *                  example: 201
 *                metadata:
 *                  type: object
 *                  properties:
 *                    publicKey:
 *                      type: string
 *                      example: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1NVqhbrMOCFwvIuT9lx6\nKbi7vIaDwWB3SQIQLg1O8J7AWmlgmrOX/FTgfQ89uMruQH+kGPmDfzLiaRj38JFw\nEb2JokUOEepNVDT75SE1MXz4i55bx+EdsDdBElzK0uR7NlG5myO5WzOQc4h70zvY\nbRJ/pzgl8osS6nozFQ8is2Yh9xW67xuBI/qZHfKNdxd/GbzaZcs2p5sjDCJ8CHRg\nFrbHk5tIQ9q15yehQBctIF3s8lywMh6+GE3uwuSaDKrwO682+WHXcZ2oL1Rk6l4/\nP5fHaJQOELjMiweMKTrcXiBkBdDvqj6PbgH3lIw0qxTcfZVi8RtduLUDs1Ls02Cx\n5QIDAQAB\n-----END PUBLIC KEY-----\n"
 *                    tokens:
 *                      type: object
 *                      properties:
 *                        accessToken: 
 *                          type: string
 *                          example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMGE3Nzc0ZjViMDE2Y2U0YTc5ODFkIiwiaWF0IjoxNzIzOTAxODE1LCJleHAiOjE3MjQwNzQ2MTV9.Xx7cnpeWGLuwIlvWmrxH6HGQDHw5eoW1qhrq61irV-QprkDjFWSTbo6TL63ECB15EFKEYGK_Q26DqmnQCXzyWuIVhAfeQyhL6Qsy6cnv-qk8Umz7Dbmzq6ySrbZ-bB63jMBoa0mVOUjUXZu4EjmPeo98jhzm_18_sb2E_y8-xGHA14-y9r1R16BeTctFSA3mAdhwvgpplQnFVOOWtiM9cm5ENjI6x9JZvdfCfoPZHzFvlV1b7iqDPZT0bW2NbEv9_kgZHLVgaTqpj_7j6ImuU_u_38EtoPVY5Ruym2u580iB0-FHDiSZkjzr5flRH8AOPI-JLgL8Kn4HRc2ATpf7fw"
 *                        refreshToken:
 *                          type: string
 *                          example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMGE3Nzc0ZjViMDE2Y2U0YTc5ODFkIiwiaWF0IjoxNzIzOTAxODE1LCJleHAiOjE3MjQ1MDY2MTV9.leQ-cJhp-kZxuD3Txb2VYUrZ4D8hDvTP1J00y5yv8GdZ6z2gSz245i6jCxC3LrIf7tP9FvOHQC8dn_jgDyBk7wGva1n-0N5oBl0w1YIDig8uPxPWjZ5DSmA5hsXVdyRhAZCkDR-gm7HbZaCEwjE0TMvDHetlUjfB3Sx6dvbZFQoFmCKQ4E-4fYoUWTJTXd0fJHCJ7VMT9yiLahP_Qye0xR7bp0FxZeZJDs1vHngu30uQPdclQS-k_YY2K5EW8he4TMIA4LBmiaa-kfGFKo54-UiqVJSCfpXkk49YLeJJNDfMeZWsLvMZhRzDEeEhg8-5_fxUxUibtN0LGUpKOxmX-w"
 *       '403':
 *         description: Bad request
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: 'error'
 *                code: 
 *                  type: number
 *                  example: 403
 *                message: 
 *                  type: string
 *                  example: "Email has already been registered."
 *       '401':
 *         description: Unauthorized due to missing or invalid API key or authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized access
 */
router.post('/auth/register', asyncHandler(new AuthControler().register))


/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login for a user
 *     description: Logs in a user with the provided email and password. Requires both `x-api-key` and `Authorization` headers.
 *     operationId: loginUser
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User credentials required for login.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nguyengiahau2004@gmail.com
 *               password:
 *                 type: string
 *                 example: '@Giahau123'
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful!
 *                 status:
 *                   type: number
 *                   example: 200
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     publicKey:
 *                       type: string
 *                       example: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1NVqhbrMOCFwvIuT9lx6\nKbi7vIaDwWB3SQIQLg1O8J7AWmlgmrOX/FTgfQ89uMruQH+kGPmDfzLiaRj38JFw\nEb2JokUOEepNVDT75SE1MXz4i55bx+EdsDdBElzK0uR7NlG5myO5WzOQc4h70zvY\nbRJ/pzgl8osS6nozFQ8is2Yh9xW67xuBI/qZHfKNdxd/GbzaZcs2p5sjDCJ8CHRg\nFrbHk5tIQ9q15yehQBctIF3s8lywMh6+GE3uwuSaDKrwO682+WHXcZ2oL1Rk6l4/\nP5fHaJQOELjMiweMKTrcXiBkBdDvqj6PbgH3lIw0qxTcfZVi8RtduLUDs1Ls02Cx\n5QIDAQAB\n-----END PUBLIC KEY-----\n"
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMGE3Nzc0ZjViMDE2Y2U0YTc5ODFkIiwiaWF0IjoxNzIzOTAxODE1LCJleHAiOjE3MjQwNzQ2MTV9.Xx7cnpeWGLuwIlvWmrxH6HGQDHw5eoW1qhrq61irV-QprkDjFWSTbo6TL63ECB15EFKEYGK_Q26DqmnQCXzyWuIVhAfeQyhL6Qsy6cnv-qk8Umz7Dbmzq6ySrbZ-bB63jMBoa0mVOUjUXZu4EjmPeo98jhzm_18_sb2E_y8-xGHA14-y9r1R16BeTctFSA3mAdhwvgpplQnFVOOWtiM9cm5ENjI6x9JZvdfCfoPZHzFvlV1b7iqDPZT0bW2NbEv9_kgZHLVgaTqpj_7j6ImuU_u_38EtoPVY5Ruym2u580iB0-FHDiSZkjzr5flRH8AOPI-JLgL8Kn4HRc2ATpf7fw"
 *                         refreshToken:
 *                           type: string
 *                           example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMGE3Nzc0ZjViMDE2Y2U0YTc5ODFkIiwiaWF0IjoxNzIzOTAxODE1LCJleHAiOjE3MjQ1MDY2MTV9.leQ-cJhp-kZxuD3Txb2VYUrZ4D8hDvTP1J00y5yv8GdZ6z2gSz245i6jCxC3LrIf7tP9FvOHQC8dn_jgDyBk7wGva1n-0N5oBl0w1YIDig8uPxPWjZ5DSmA5hsXVdyRhAZCkDR-gm7HbZaCEwjE0TMvDHetlUjfB3Sx6dvbZFQoFmCKQ4E-4fYoUWTJTXd0fJHCJ7VMT9yiLahP_Qye0xR7bp0FxZeZJDs1vHngu30uQPdclQS-k_YY2K5EW8he4TMIA4LBmiaa-kfGFKo54-UiqVJSCfpXkk49YLeJJNDfMeZWsLvMZhRzDEeEhg8-5_fxUxUibtN0LGUpKOxmX-w"
 *       '401':
 *         description: Unauthorized due to missing or invalid API key or authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized access
 *       '403':
 *         description: Forbidden due to invalid credentials or access rights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                 code:
 *                   type: number
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Email has already been registered."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/auth/login', asyncHandler(new AuthControler().login))//reset password with token 


/**
 * @openapi
 * /auth/password/resetWithToken:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 'Set new password with token'
 *     description: 'Endpoint to reset the user password using a token'
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *           example: "46c7516545205a29"
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "66bd613e76612480db541561"
 *       - name: token
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "9077db087dc6fe28fd3f763d461334a945fe93edb028eb503a2ed1beecb98626"
 *     requestBody:
 *       description: JSON object containing the new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "@Giahau123"
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *                 status:
 *                   type: number
 *                   example: 200
 *       '400':
 *         description: Bad request due to invalid parameters or body content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters or body content"
 *       '401':
 *         description: Unauthorized due to missing or invalid API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/auth/password/resetWithToken', asyncHandler(new AuthControler().resetPasswordWithToken))


/**
 * @openapi
 * /auth/password/forgot:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 'Forgot password'
 *     description: 'Endpoint to handle forgot password requests'
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing the email for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "nguyengiahau200@gmail.com"
 *     responses:
 *       '200':
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent successfully"
 *                 status:
 *                   type: number
 *                   example: 200
 *       '400':
 *         description: Bad request due to invalid email or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       '401':
 *         description: Unauthorized due to missing or invalid API key or authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/auth/password/forgot', asyncHandler(new AuthControler().passwordForgot))


/**
 * @openapi
 * /auth/password/reset:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 'Reset password'
 *     description: 'Endpoint to reset the user password with the current password, new password, and public key'
 *     parameters:
 *       - name: access-token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing the current password, new password, and public key
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "@Giahau2004"
 *               newPassword:
 *                 type: string
 *                 example: "@Giahau20044"
 *               publicKey:
 *                 type: string
 *                 example: |
 *                   -----BEGIN PUBLIC KEY-----
 *                   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxOXMrQhfEFCsjgmEk5r1
 *                   MwCt1m7M/E2g/nMw0R9KwsotGa4ThSJV9RQ7aSuK9ehg6jECOdBW9P5TuX+Y3pMM
 *                   CzhfAZjQAXCIv/vD3sslN2qbV3Ac1DmwO8aDKfLU1Yv3JbpjKshTeiEakFe8lmXf
 *                   WVKWcFxVFG6LurvHLBrzEcdS83K48mgqW/KrBfdPvUv9MrXtxsBZpWKieatfeX26
 *                   VvBY2OH/ZhoM0xHBspoYOnWvQGwt+MCiQhqwdaxPk5gVztT3G7rkY123uyBDeY0g
 *                   mr33+ji/+VTLRbuYtrg+P9M+yXThO6NiZP6bsX0pVszuK7TfOI3MzTHAYkAYEesq
 *                   LQIDAQAB
 *                   -----END PUBLIC KEY-----
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *                 status:
 *                   type: number
 *                   example: 200
 *       '400':
 *         description: Bad request due to invalid parameters or body content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters or body content"
 *       '401':
 *         description: Unauthorized due to missing or invalid API key or authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
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

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *      - Auth
 *     summary: Logout user
 *     description: Logs out the user by invalidating the session or token
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *       - name: access-token
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Request body for logout
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicKey:
 *                 type: string
 *                 example: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtY1DLT1xBO0oHLeiIYCT\nUgh7LArp+P4BJnXij3lZpDOZgHkG/9ErzlORxGHXZK/CcS+pB8SHCsPu3UcjIg0x\nywn33omz3+vmMnZIZmWgNAE1F1bcy1wQIbF+ZQg68Q1UE517LDryWPbM/F1wdWZj\nTULWqYANbfTVKho4JiQxX2GfOR7/X+m2T9hTmwS7tnP0PXwm7cLyTeBIP5/Ka+cN\n3/sJKXAmtMlP1ObeLVzgIGaEaakOlUZMn0bF1rlTwVg0dJpP2g1cLUHCNi1VeKVg\n0FK0bwwr6L7mjLgIjcbj7dbtFs5WCzuI6EvOouftMhmLfLb8ehCqtg0qhyK/wFRf\niwIDAQAB\n-----END PUBLIC KEY-----\n"
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Bad request
 *       '404':
 *         description: Not found
 */
router.post('/auth/logout', authentication, asyncHandler(new AuthControler().logout))


/**
 * @openapi
 * /auth/token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 'Refresh user token'
 *     description: ''
 *     parameters:
 *       - name: x-api-key
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Request body for refresh token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicKey:
 *                 type: string
 *                 example: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtY1DLT1xBO0oHLeiIYCT\nUgh7LArp+P4BJnXij3lZpDOZgHkG/9ErzlORxGHXZK/CcS+pB8SHCsPu3UcjIg0x\nywn33omz3+vmMnZIZmWgNAE1F1bcy1wQIbF+ZQg68Q1UE517LDryWPbM/F1wdWZj\nTULWqYANbfTVKho4JiQxX2GfOR7/X+m2T9hTmwS7tnP0PXwm7cLyTeBIP5/Ka+cN\n3/sJKXAmtMlP1ObeLVzgIGaEaakOlUZMn0bF1rlTwVg0dJpP2g1cLUHCNi1VeKVg\n0FK0bwwr6L7mjLgIjcbj7dbtFs5WCzuI6EvOouftMhmLfLb8ehCqtg0qhyK/wFRf\niwIDAQAB\n-----END PUBLIC KEY-----\n"
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZiZDYxM2U3NjYxMjQ4MGRiNTQxNTYxIiwiaWF0IjoxNzIzNjg3NDM3LCJleHAiOjE3MjQyOTIyMzd9.VdiPbLxAUBD6AtO8ORnSCVsVLlJDb3_LDH62-zJIpVv_qNeTKL9HSLwFz77WULF8KhyZpyvBtoKBeQWoT--bTsPDuA-Z_fq3DdJxB75LNUHo_Nf-XRkkaZwAarIpqcNrj5ssivb4USefHVF8OW6iBHxiOza-GVkSCen_1lb9-kYHofuwTxgKHJJmXJvFPV0873bcOFhcxJ1BNyKTZuyuOxOIaUg74DGnb3GJlxptswTzKszonbeW4QmajeN8NCNBoYczweA--5UVlZkii21w7xOQspi3f93OLNZwTrLiEyZcUOQEbZDNlqCWWsZdl0sbDcpedZdWdvr6ORys3sggyQ"
 *     responses:
 *       '200':
 *         description: User successfully refreshed token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful!"
 *                 status:
 *                   type: number
 *                   example: 200
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     publicKey:
 *                       type: string
 *                       example: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1NVqhbrMOCFwvIuT9lx6\nKbi7vIaDwWB3SQIQLg1O8J7AWmlgmrOX/FTgfQ89uMruQH+kGPmDfzLiaRj38JFw\nEb2JokUOEepNVDT75SE1MXz4i55bx+EdsDdBElzK0uR7NlG5myO5WzOQc4h70zvY\nbRJ/pzgl8osS6nozFQ8is2Yh9xW67xuBI/qZHfKNdxd/GbzaZcs2p5sjDCJ8CHRg\nFrbHk5tIQ9q15yehQBctIF3s8lywMh6+GE3uwuSaDKrwO682+WHXcZ2oL1Rk6l4/\nP5fHaJQOELjMiweMKTrcXiBkBdDvqj6PbgH3lIw0qxTcfZVi8RtduLUDs1Ls02Cx\n5QIDAQAB\n-----END PUBLIC KEY-----\n"
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMGE3Nzc0ZjViMDE2Y2U0YTc5ODFkIiwiaWF0IjoxNzIzOTAxODE1LCJleHAiOjE3MjQwNzQ2MTV9.Xx7cnpeWGLuwIlvWmrxH6HGQDHw5eoW1qhrq61irV-QprkDjFWSTbo6TL63ECB15EFKEYGK_Q26DqmnQCXzyWuIVhAfeQyhL6Qsy6cnv-qk8Umz7Dbmzq6ySrbZ-bB63jMBoa0mVOUjUXZu4EjmPeo98jhzm_18_sb2E_y8-xGHA14-y9r1R16BeTctFSA3mAdhwvgpplQnFVOOWtiM9cm5ENjI6x9JZvdfCfoPZHzFvlV1b7iqDPZT0bW2NbEv9_kgZHLVgaTqpj_7j6ImuU_u_38EtoPVY5Ruym2u580iB0-FHDiSZkjzr5flRH8AOPI-JLgL8Kn4HRc2ATpf7fw"
 *                         refreshToken:
 *                           type: string
 *                           example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjMGE3Nzc0ZjViMDE2Y2U0YTc5ODFkIiwiaWF0IjoxNzIzOTAxODE1LCJleHAiOjE3MjQ1MDY2MTV9.leQ-cJhp-kZxuD3Txb2VYUrZ4D8hDvTP1J00y5yv8GdZ6z2gSz245i6jCxC3LrIf7tP9FvOHQC8dn_jgDyBk7wGva1n-0N5oBl0w1YIDig8uPxPWjZ5DSmA5hsXVdyRhAZCkDR-gm7HbZaCEwjE0TMvDHetlUjfB3Sx6dvbZFQoFmCKQ4E-4fYoUWTJTXd0fJHCJ7VMT9yiLahP_Qye0xR7bp0FxZeZJDs1vHngu30uQPdclQS-k_YY2K5EW8he4TMIA4LBmiaa-kfGFKo54-UiqVJSCfpXkk49YLeJJNDfMeZWsLvMZhRzDEeEhg8-5_fxUxUibtN0LGUpKOxmX-w"
 *       '401':
 *         description: Unauthorized due to missing or invalid API key or authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '409':
 *         description: Conflict error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: number
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "Conflict"
 */
router.post('/auth/token', asyncHandler(new AuthControler().checkToken))

export default router
