import express from 'express'
import authRouter from './auth/auth_route'

const router = express.Router()

router.use('/', authRouter)

// test api 
router.get('/hello-world', (req, res) => {
  return res.status(200).json({
    message: 'Hello World'
  })
})

export default router
