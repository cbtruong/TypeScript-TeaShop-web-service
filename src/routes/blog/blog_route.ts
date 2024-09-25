import express from 'express';
import multer from 'multer';
import { authentication, checkRole } from '../../auth/auth_utils';
import { checkApiKey, checkPermissions } from '../../auth/check_auth';
import { ROLES } from '../../constant';
import { asyncHandler } from '../../helpers/async_handler';
import BlogController from '../../controllers/blog_controller';
const router = express.Router();


const upload = multer({ dest: 'upload/' });

// create blog
router.post('/', checkApiKey, checkPermissions('admin'), authentication, checkRole([ROLES.ADMIN]), asyncHandler(new BlogController().createBlog))

// get blogs
router.get('/', checkApiKey, asyncHandler(new BlogController().getBlogs))

// get blogs by id
router.get('/:id', checkApiKey, asyncHandler(new BlogController().getBlog))
export default router;
