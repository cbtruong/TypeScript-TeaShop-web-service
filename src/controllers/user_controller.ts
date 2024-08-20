import { Request, Response } from "express";
import { BadRequestError } from "../core/error_response";
import { OK } from "../core/success_response";


class UserController {
  public async uploadAvatar(req: Request, res: Response) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded')
    }

    // const file = req.file.path

    new OK({
      message: 'File uploaded successfully',
      metadata: {}
    }).send(res)
  }
}

export default UserController
