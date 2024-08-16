import express, { Response, Request } from 'express'
import authRouter from './auth/auth_route'
import { checkApiKey, checkPermissions } from '../auth/check_auth'

const router = express.Router()


// check apikey
router.use(checkApiKey)

// check permission
router.use(checkPermissions('read'))

// for auth router
router.use('/', authRouter)

router.get('/', (req: Request, res: Response) => {
  if (req.user)
    return res.status(200).json({
      metadata: req.user,
    })

  return res.status(200).json({
    message: 'Hello world'
  })
})

export default router
