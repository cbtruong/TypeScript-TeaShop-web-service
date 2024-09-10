import { Request, Response } from 'express';
import { BadRequestError } from '../core/error_response';
import { CREATED, OK } from '../core/success_response';
import UserService, { UserAboutServices, UserAddressServices } from '../services/user_service';
import { IUserAbout, IUserAdress, UserAddressModel } from '../models/user_model';
import { FOLDER_ID, uploadToDrive } from '../configs/googleDriveAPI_config';

interface CustomRequest extends Request {
  keyStore?: any;
}

class UserController {
  public async getAccount(req: CustomRequest, res: Response) {
    new OK({
      message: "Get account info successfully!",
      metadata: await UserService.getMyAccount(req.keyStore.user_id)
    }).send(res)
  }

  public async updateAccount(req: CustomRequest, res: Response) {
    const data: any = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      title: req.body.title,
      phone: req.body.phone
    }
    new OK({
      message: "Update account successfully",
      metadata: await UserService.updateAccount(req.keyStore.user_id, data)
    }).send(res)
  }

  public async uploadAvatar(req: CustomRequest, res: Response) {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }
    const file = req.file
    const file_id = await uploadToDrive(file.originalname, FOLDER_ID.uploads, file.path, file.mimetype)
    new OK({
      message: 'File uploaded successfully',
      metadata: await UserService.uploadAvatar(req.keyStore.user_id, file.filename, file_id)
    }).send(res);
  }
  public async getInfo(req: CustomRequest, res: Response) {
    new OK({
      message: "successfully",
      metadata: {}
    })
  }
}

export class UserAddressController {
  public async deleteAddress(req: CustomRequest, res: Response) {
    new OK({
      message: 'Delete successfully!',
      metadata: await UserAddressServices.deleteAddress(req.body.address_id)
    }).send(res)
  }

  public async getAddress(req: CustomRequest, res: Response) {
    new OK({
      message: 'Get address successfully!',
      metadata: await UserAddressServices.getAddress(req.keyStore.user_id)
    }).send(res)
  }

  public async addAddress(req: CustomRequest, res: Response) {
    const data: IUserAdress = req.body
    data.user_id = req.keyStore.user_id
    new CREATED({
      message: "Addres new address successfully!",
      metadata: await UserAddressServices.addAddress(data)
    }).send(res)
  }
  public async updateAddress(req: CustomRequest, res: Response) {
    const data: IUserAdress = req.body
    new OK({
      message: "Address update successfully!",
      metadata: await UserAddressServices.updateAddress(req.body.address_id, data)
    }).send(res)
  }
}

export class UserAboutController {
  public async updateAbout(req: CustomRequest, res: Response) {
    const data: IUserAbout = req.body
    data.sessions = req.body.sessions
    data.user_id = req.keyStore.user_id
    new OK({
      message: "User about upload successfully!",
      metadata: await UserAboutServices.uploadAbout(data)
    }).send(res)
  }

  public async getAbout(req: CustomRequest, res: Response) {
    new OK({
      message: "Get user about successfully!",
      metadata: {}
    })
  }
}

export default UserController;

