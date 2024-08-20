
import express, { Request, Response, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import { authentication } from '../../auth/auth_utils';
import UserController from '../../controllers/user_controller';
import { asyncHandler } from '../../helpers/async_handler';

// Create a router instance
const router = express.Router();

// Image Storage Engine
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadPath = path.join(__dirname, '../../uploads/users');
    cb(null, uploadPath);
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

export default router;

