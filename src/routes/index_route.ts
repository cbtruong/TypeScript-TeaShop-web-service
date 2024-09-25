import express, { Response, Request } from 'express'

import authRouter from './auth/auth_route'
import userRouter from './user/user_routes'
import productRouter from './product/product_router'
import blogRouter from './blog/blog_route'

import { checkApiKey, checkPermissions } from '../auth/check_auth'
import { blogger } from 'googleapis/build/src/apis/blogger'

const router = express.Router()

// for auth router
router.use('/auth', checkApiKey, checkPermissions('user'), authRouter)

// for user router
router.use('/user', checkApiKey, checkPermissions('user'), userRouter)

// for product router
router.use('/product', productRouter)

// for blog Router
router.use('/blog', blogRouter)
// test router
router.get('/', (req: Request, res: Response) => {
  console.log(req.params)
})

export default router
