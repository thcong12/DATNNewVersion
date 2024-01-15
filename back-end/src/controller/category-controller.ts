import { Model } from "mongoose";
import { ControllerBase } from "../base/controller-base";
import { CategloryModel, ICateglory } from "../model/product/CategloryModel";
import {
  IProduct,
  IProductDetail,
  ProductDetailModel,
  ProductModel,
} from "../model/product/ProductModel";

export class CategloryController extends ControllerBase<ICateglory> {
  public ProductModel: Model<IProduct> = ProductModel;
  public ProductDetailModel: Model<IProductDetail> = ProductDetailModel;
  constructor() {
    super(CategloryModel);
  }
  // async CategoryHomePage() {
  //   let dataResult: any = [];
  //   const category = await this.model.find({});
  //   for (let i = 0; i < category.length; i++) {
  //     const productsDetail = (
  //       await this.ProductDetailModel.find({
  //         categlory: category[i]._id,
  //       }).limit(3)
  //     ).map((detail) => {
  //       return detail.productId;
  //     });

  //     const products = await this.ProductModel.find({
  //       _id: { $in: productsDetail },
  //     });
  //     if (products.length > 2 && category[i].image != "") {
  //       dataResult.push({
  //         category: category[i].cateName,
  //         products: products.map((item) => {
  //           return item.productName;
  //         }),
  //       });
  //     }
  //   }
  //   // const aaa = category.map(async (item) => {
  //   //   const products = await this.ProductModel.find({
  //   //     _id: { $in: productsDetail },
  //   //   });
  //   //   return {
  //   //     category: item._id,
  //   //     products: products,
  //   //   };
  //   // });
  //   console.log(dataResult);

  //   return dataResult;
  // }
}
