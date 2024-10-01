import { ExtraModel, IExtra } from "../../models/product_model";
import Product from "./IProduct";

class Extra implements Product {
  async create(extraData: IExtra) {
    return await ExtraModel.create(extraData)
  }

  async getProducts(page: number, limit: number) {
    const skip = (page - 1) * limit
    const products = await ExtraModel.find().skip(skip).limit(limit)
    const total = await ExtraModel.countDocuments()
    return {
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getProductById(productID: string) {
    const product = await ExtraModel.findOne({ _id: productID }).lean()
    return product
  }
}

export default Extra;
