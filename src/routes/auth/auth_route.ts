import express from "express";
import AuthControler from "../../controlers/auth_controler";
import { asyncHandler } from "../../auth/check_auth";

const router = express.Router()

router.post('/auth/register', asyncHandler(new AuthControler().register))
router.post('/auth/login', asyncHandler(new AuthControler().login))
export default router
