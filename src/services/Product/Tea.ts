import { ITea, TeaModel } from "../../models/product_model";
import Product from "./IProduct";

class Tea implements Product {
  async create(teaData: ITea) {
    return await TeaModel.create(teaData)
  }

  async getProducts(page: number, limit: number) {
    const skip = (page - 1) * limit
    const products = await TeaModel.find().skip(skip).limit(limit)
    const total = await TeaModel.countDocuments()
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
    const product = await TeaModel.findOne({ _id: productID }).lean()
    return product
  }
}

export default Tea;
