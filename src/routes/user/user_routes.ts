import express from 'express';
import multer from 'multer';
import { authentication } from '../../auth/auth_utils';
import UserController, { UserAboutController, UserAddressController } from '../../controllers/user_controller';
import { asyncHandler } from '../../helpers/async_handler';

// Create a router instance
const router = express.Router();

// Initialize multer with the storage configuration
const upload = multer({ dest: 'upload/' });

// Define a route for uploading avatars
router.post('/upload-avatar', authentication, upload.array('images'), asyncHandler(new UserController().uploadAvatar));

// Get avatar
router.get('/', authentication, asyncHandler(new UserController().getInfo))
//
//
//
//add new address 
router.post('/add-address', authentication, asyncHandler(new UserAddressController().addAddress))
//update new address
router.post('/update-address', authentication, asyncHandler(new UserAddressController().updateAddress))
//get address
router.get('/get-address', authentication, asyncHandler(new UserAddressController().getAddress))
//delete address
router.delete('/delete-address', authentication, asyncHandler(new UserAddressController().deleteAddress))
//
//
//
//
//update user about
router.post('/update-about', authentication, asyncHandler(new UserAboutController().updateAbout))
//get user about
router.get('/get-about', authentication, asyncHandler(new UserAboutController().getAbout))
//
//
//
//get info of account
router.get('/my-account', authentication, asyncHandler(new UserController().getAccount))
//update info for account
router.post('/my-account', authentication, asyncHandler(new UserController().updateAccount))
export default router;

