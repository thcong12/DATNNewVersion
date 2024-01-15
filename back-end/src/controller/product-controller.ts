import { NextFunction, Request } from "express";

import { Model } from "mongoose";
import {
  IProduct,
  ProductModel,
  IProductDetail,
  ProductDetailModel,
} from "../model/product/ProductModel";
import { ProductControllerBase } from "../base/product-base-controller";
import { DataRecomendController } from "./recommend-controller";

export class ProductController extends ProductControllerBase {
  constructor() {
    super();
  }
  async getAllproduct(number: number) {
    const products = await this.ProductModel.find({ isActive: true }).limit(
      number
    );

    const productDetails = await this.getDetailInformation(products, "_id");
    const dataFinal = this.dataReturn(products, productDetails);
    return dataFinal;
  }
  async getAllproductForDashboard(number: number) {
    const products = await this.ProductModel.find({ isActive: true }).limit(
      number
    );

    const dataFinal = products.map((item) => {
      return {
        product: item,
      };
    });
    return dataFinal;
  }
  async getProduct(product: any) {
    return await this.ProductModel.find({
      _id: { $in: product },
    });
  }
  async createProudct(req: Request) {
    const reqData: IProduct = req.body;
    const productExist = await this.ProductModel.findOne({
      productName: reqData.productName,
    });
    if (!productExist) {
      const newProduct = await this.ProductModel.create<IProduct>({
        ...reqData,
      });
      return newProduct;
    }
  }
  async modifyProduct(id: string, req: Request) {
    const existProduct = await this.ProductModel.findById(id);
    if (existProduct) {
      const reqData: IProduct = req.body;
      const dataModify = this.ProductModel.findByIdAndUpdate<IProduct>(
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
    console.log(id);
    const existProductDetail = await this.ProductDetailModel.findOne({
      productId: id,
    });
    if (existProductDetail == null) {
      const productDetail = await this.ProductDetailModel.create({
        ...reqData,
        productId: id,
      });
      return productDetail;
    }
    const dataModify = this.ProductDetailModel.findOneAndUpdate(
      {
        productId: id,
      },
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
  async getDetailProduct(id: string) {
    const product = await this.ProductModel.findOne({
      _id: id,
    });
    const detail = await this.ProductDetailModel.findOne({
      productId: id,
    });
    return {
      product: product,
      detail: detail,
    };
  }
}
