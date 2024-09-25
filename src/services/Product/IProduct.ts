import { IProduct } from "../../models/product_model";


interface Product {
  create(productData: IProduct): any;
  getProductById(productID: string): any;
  getProducts(page: number, limit: number): any;
}

export default Product;
