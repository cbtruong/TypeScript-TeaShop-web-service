import express from "express";
import AuthControler from "../../controlers/auth_controler";

const router = express.Router()

router.post('/auth/register', new AuthControler().register)
router.post('/auth/login', new AuthControler().login)
export default router
