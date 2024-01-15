import { Model } from "mongoose";
import {
  IProduct,
  IProductDetail,
  ProductDetailModel,
  ProductModel,
} from "../model/product/ProductModel";

export abstract class ProductControllerBase {
  protected ProductModel: Model<IProduct> = ProductModel;
  protected ProductDetailModel: Model<IProductDetail> = ProductDetailModel;
  constructor() {}
  dataReturn(product: IProduct[], productDetail: IProductDetail[]) {
    let dataFinal: any[] = [];
    product.map((item) => {
      const isExist = productDetail.findIndex((detail) => {
        return String(item._id) == String(detail.productId);
      });
      if (isExist != -1) {
        return dataFinal.push({
          product: item,
          detail: productDetail[isExist],
        });
      }
    });
    return dataFinal;
  }
  defindInputData(products: any, key: string) {
    let arrayProductId: any[] = [];
    if (typeof products === "string") {
      arrayProductId.push(products);
    } else {
      arrayProductId = (products as any[]).map((item) => {
        return item[key];
      });
    }
    return arrayProductId;
  }
  async getDetailInformation(products: any, key: any) {
    const data = this.defindInputData(products, key);
    const productDetail = await this.ProductDetailModel.aggregate([
      {
        $match: {
          productId: { $in: data },
        },
      },
      {
        $lookup: {
          from: "developers",
          localField: "developer",
          foreignField: "_id",
          as: "developer",
        },
      },
      {
        $lookup: {
          from: "categlories",
          localField: "categlory",
          foreignField: "_id",
          as: "categlory",
        },
      },
      { $unwind: "$developer" },
    ]);
    return productDetail;
  }
}
