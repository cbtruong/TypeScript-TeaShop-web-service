import express from 'express';
import { checkApiKey, checkPermissions } from '../../auth/check_auth';
import { authentication, checkRole } from '../../auth/auth_utils';
import { asyncHandler } from '../../helpers/async_handler';
import ProductController from '../../controllers/product_controller';
import { ROLES } from '../../constant';
import multer from 'multer';
const router = express.Router();


const upload = multer({ dest: 'upload/' });

// create a new product
router.post('/', checkApiKey, checkPermissions('admin'), authentication, checkRole([ROLES.ADMIN]), upload.array('images'), asyncHandler(new ProductController().createNewProduct))

// get list product
router.get('/', asyncHandler(new ProductController().getProducts))

// get product by product id
router.get('/', asyncHandler(new ProductController().getProduct))

export default router;
