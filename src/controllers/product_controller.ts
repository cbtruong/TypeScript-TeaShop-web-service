import { Request, Response } from "express";
import ProductService from "../services/Product/ProductService";
import { CATEGORIES } from "../constant";
import { BadRequestError, NotFoundError } from "../core/error_response";
import { CREATED, OK } from "../core/success_response";
import deleteMultipleFilesOnLocal from "../untils/file/deleteFile";
import { FOLDER_ID, uploadToDrive } from "../configs/googleDriveAPI_config";

class ProductController {
  public async createNewProduct(req: Request, res: Response) {
    if (!req.files || req.files.length === 0) {
      throw new BadRequestError('invalid file');
    }

    const files = req.files as Array<Express.Multer.File>;
    const fileDetails = files.map(file => ({
      fileName: file.originalname,
      filePath: file.path,
      mimeType: file.mimetype
    }));

    const fileIds = await uploadToDrive(fileDetails, FOLDER_ID.uploads);

    // Check if fileIds is defined and has the expected number of IDs
    if (!fileIds || fileIds.length === 0) {
      throw new BadRequestError('Failed to upload files to Google Drive');
    }

    const filePaths = (req.files as Array<Express.Multer.File>).map((file) => 'upload/' + file.filename);
    deleteMultipleFilesOnLocal(filePaths)

    req.body.productImages = fileIds

    const category: string = req.body.category;
    if (CATEGORIES.includes(category)) {
      const productData: any = req.body
      new CREATED({
        message: "Create success_response",
        metadata: await ProductService.create(category, productData)
      }).send(res)
    } else throw new BadRequestError("Invalid category!")
  }

  public async getProducts(req: Request, res: Response) {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const category = String(req.query.category)

    if (CATEGORIES.includes(category)) {
      new CREATED({
        message: "Create success_response",
        metadata: await ProductService.getProducts(category, page, limit)
      }).send(res)
    } else throw new BadRequestError("Invalid category!")
  }

  public async getProduct(req: Request, res: Response) {
    const productID = String(req.query.id)
    if (!productID) throw new BadRequestError('Invalid ID');

    const category: string = String(req.query.category);
    if (CATEGORIES.includes(category)) {
      new CREATED({
        message: "Create success_response",
        metadata: await ProductService.getProductById(category, productID)
      }).send(res)
    } else throw new BadRequestError("Invalid category!")
  }
}

export default ProductController;
