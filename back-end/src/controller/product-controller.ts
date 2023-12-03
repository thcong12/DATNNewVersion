import { NextFunction, Request } from "express";

import { Model } from "mongoose";
import {
  IProduct,
  ProductModel,
  IProductDetail,
  ProductDetailModel,
} from "../model/product/ProductModel";

export class ProductController {
  public product: Model<IProduct> = ProductModel;
  public detail: Model<IProductDetail> = ProductDetailModel;
  constructor() {}
  async getAllproduct(number: number): Promise<IProduct[]> {
    const data = await this.product.find({ isActive: true }).limit(number);
    if (data) {
      return data;
    } else {
      return [];
    }
  }
  async getProductDetail(id: any) {
    const dataProduct = await this.product.findOne({ _id: id });
    // const dataDetail = await this.detail.findOne({ productId: id }); && dataDetail
    if (dataProduct) {
      return dataProduct;
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
      const reqData: IProduct = req.body;
      const dataModify = this.product.findByIdAndUpdate<IProduct>(
        id,
        {
          $set: {
            ...reqData,
          },
        },
        {
          new: true,
        }
      );
      return dataModify;
    }
  }
  async modifyDetailProduct(id: string, req: Request) {
    const reqData: IProductDetail = req.body;
    const existProductDetail = await this.detail.findOne({ productId: id });
    if (existProductDetail) {
      const productDetail = new ProductDetailModel({
        ...reqData,
        productId: id,
      });
      await productDetail.save();
      return productDetail;
    }
    const dataModify = this.product.findByIdAndUpdate<IProductDetail>(
      id,
      {
        $set: {
          ...reqData,
        },
      },
      {
        new: true,
      }
    );
    return dataModify;
  }
  // async getDataProduct(id: string, data: any[]) {
  //   const existProduct = await this.product.findById(id);
  //   if (existProduct) {

  //   }
  // }
  // async getProductSale() {
  //   const today = new Date();
  //   const produtSale: IProduct[] = await this.getAllproduct();
  //   const result = produtSale.filter(
  //     (product: IProduct) => product.sale.salePersent != 0
  //   );
  //   if (result) {
  //     // const checkExprieDay = result.filter(
  //     //   (product: IProduct) =>
  //     //     new Date(product.sale.startDay).getTime() < today.getTime() &&
  //     //     new Date(product.sale.endDay).getTime() >= today.getTime()
  //     // );
  //     // return checkExprieDay;
  //   }
  // }
  // async getSearchProduct(value: any) {
  //   const result = await this.product.find({
  //     productName: { $regex: value, $options: "$i" },
  //   });
  //   if (result) {
  //     return result;
  //   }
  // }
}
