import { Request, Response } from 'express';
import { BadRequestError } from '../core/error_response';
import { OK } from '../core/success_response';
import UserService from '../services/user_service';

interface CustomRequest extends Request {
  keyStore?: any;
}

class UserController {
  public async uploadAvatar(req: CustomRequest, res: Response) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }

    new OK({
      message: 'File uploaded successfully',
      metadata: await UserService.uploadAvatar(req.keyStore.user_id, req.file.filename)
    }).send(res);
  }

  public async getAvatar(req: CustomRequest, res: Response) {
    new OK({
      message: "successfully",
      metadata: {}
    })
  }
}

export default UserController;

