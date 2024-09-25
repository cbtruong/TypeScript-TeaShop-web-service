import { ConflictRequestError, NotFoundError } from "../../core/error_response";
import ProductFactory from "./ProductFactory";

class ProductService {
  public static async create(category: string, productData: any) {
    const newProduct = await ProductFactory.createProduct(category, productData)
    if (!newProduct) throw new ConflictRequestError()
    return newProduct;
  }
  public static async getProductById(category: string, productID: string) {
    const product = await ProductFactory.getProductById(category, productID)
    if (!product) throw new NotFoundError("ID not found")

    for (let i = 0; i < product.productImages.length; i++) {
      product.productImages[i] = `https://drive.google.com/thumbnail?id=${product.productImages[i]}`
    }

    return product;
  }



  public static async getProducts(category: string, page: number, limit: number) {
    const product = await ProductFactory.getProducts(category, page, limit)
    if (!product) throw new ConflictRequestError()
    return product
  }
}

export default ProductService
