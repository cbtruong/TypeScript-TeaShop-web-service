import express from "express";
import AuthControler from "../../controlers/auth_controler";
import { asyncHandler } from "../../helpers/async_handler";
import { authentication } from "../../auth/auth_utils";

const router = express.Router()

router.post('/auth/register', asyncHandler(new AuthControler().register))
router.post('/auth/login', asyncHandler(new AuthControler().login))

// authencation 
router.use(authentication)

router.post('/auth/logout', asyncHandler(new AuthControler().logout))

export default router
