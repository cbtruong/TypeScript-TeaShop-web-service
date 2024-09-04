
import express, { Request, Response, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import { authentication } from '../../auth/auth_utils';
import UserController, { UserAboutController, UserAddressController } from '../../controllers/user_controller';
import { asyncHandler } from '../../helpers/async_handler';

// Create a router instance
const router = express.Router();

// Image Storage Engine
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, './dist/src/uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Define a route for uploading avatars
router.post('/user/upload-avatar', authentication, upload.single('avatar'), asyncHandler(new UserController().uploadAvatar));


// Get avatar
router.get('/user', authentication, asyncHandler(new UserController().getInfo))
//
//
//
//add new address 
router.post('/user/add-address', authentication, asyncHandler(new UserAddressController().addAddress))
//update new address
router.post('/user/update-address', authentication, asyncHandler(new UserAddressController().updateAddress))
//get address
router.get('/user/get-address', authentication, asyncHandler(new UserAddressController().getAddress))
//delete address
router.delete('/user/delete-address', authentication, asyncHandler(new UserAddressController().deleteAddress))
//
//
//
//
//update user about
router.post('/user/update-about', authentication, asyncHandler(new UserAboutController().updateAbout))
export default router;

