import express, { Response, Request } from 'express'
import authRouter from './auth/auth_route'
import userRouter from './user/user_routes'
import { checkApiKey, checkPermissions } from '../auth/check_auth'

const router = express.Router()


// check apikey
router.use(checkApiKey)

// check permission
router.use(checkPermissions('read'))

// for auth router
router.use('/', authRouter)

// for user router
router.use('/', userRouter)

router.get('/', (req: Request, res: Response) => {
  console.log(req.params)
})

export default router
