import { ExtraModel, ITea, TeaModel } from "../../models/product_model";
import { CATEGORY } from "../../constant";
import Tea from "./Tea";
import Extra from "./Extra";

class ProductFactory {
  static async createProduct(type: string, productData: any) {
    if (type === CATEGORY.TEA) {
      return await new Tea().create(new TeaModel(productData))
    } else if (type === CATEGORY.EXTRA) {
      return await new Extra().create(new ExtraModel(productData))
    }
    return null
  }

  static async getProducts(type: string, page: number, limit: number) {
    if (type === CATEGORY.TEA) {
      return await new Tea().getProducts(page, limit)
    } else if (type === CATEGORY.EXTRA) {
      return await new Extra().getProducts(page, limit)
    }
    return null
  }

  static async getProductById(type: string, productID: string) {
    if (type === CATEGORY.TEA) {
      return await new Tea().getProductById(productID)
    } else if (type === CATEGORY.EXTRA) {
      return await new Extra().getProductById(productID)
    }
    return null
  }
}

export default ProductFactory;
