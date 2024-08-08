import express from 'express'
import authRouter from './auth/auth_route'
import { checkApiKey, checkPermissions } from '../auth/check_auth'

const router = express.Router()


// check apikey
router.use(checkApiKey)
// check permission
router.use(checkPermissions('read'))

// for auth router
router.use('/', authRouter)

// test api 
router.get('/hello-world', (req, res) => {
  return res.status(200).json({
    message: 'Hello World'
  })
})

export default router
