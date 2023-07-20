import { Request } from "express";
import {
  IProduct,
  IProductDetail,
  ProductDetailModel,
  ProductModel,
} from "../../model/product/ProductModel";
import { Model } from "mongoose";

export class ProductController {
  public product: Model<IProduct> = ProductModel;
  public detail: Model<IProductDetail> = ProductDetailModel;
  constructor() {}
  async getAllproduct() {
    const data = await this.product.find({});
    if (data) {
      return data;
    }
  }
  async getProductDetail(id: string) {
    const dataProduct = await this.product.findOne({ _id: id });
    const dataDetail = await this.detail.findOne({ productId: id });
    if (dataProduct && dataDetail) {
      return { product: dataProduct, detail: dataDetail };
    }
  }
  async getProductByName(value: string) {
    const product = await this.product.findOne({ productName: value });
    if (product) {
      return product;
    }
  }
  async createProudct(req: Request) {
    const reqData: IProduct = req.body;
    const productExist = await this.getProductByName(reqData.productName);
    if (!productExist) {
      const newProduct = await this.product.create<IProduct>({
        ...reqData,
      });

      const productDetail = new ProductDetailModel({
        productId: newProduct._id,
      });
      await productDetail.save();
      return newProduct;
    }
  }
  async modifyProduct(id: string, req: Request) {
    const existProduct = await this.product.findById(id);
    if (existProduct) {
    }
  }
}
