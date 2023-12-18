import { NextFunction, Request } from "express";
import {
  IProduct,
  IProductDetail,
  ProductDetailModel,
  ProductModel,
} from "../model/product/ProductModel";
import { Model, Types } from "mongoose";
import { ControllerBase } from "../base/controller-base";
import { ILibraly, LibralyModel } from "../model/user/LibraryModel";
import { CategloryModel, ICateglory } from "../model/product/CategloryModel";
import { DeveloperModel, IDeveloper } from "../model/product/DeveloperModel";
import { HomeSlideModel, IHomeSlide } from "../model/feature/HomeFeature";

export class HomePageController {
  private libraly: Model<ILibraly> = LibralyModel;
  private product: Model<IProduct> = ProductModel;
  private productDetail: Model<IProductDetail> = ProductDetailModel;
  private category: Model<ICateglory> = CategloryModel;
  private developer: Model<IDeveloper> = DeveloperModel;
  private homeSlide: Model<IHomeSlide> = HomeSlideModel;
  constructor() {}
  getDetailInformation(localField: string, saveAs: string) {
    const query = [
      {
        $lookup: {
          from: "categlories",
          localField: "detail.categlory",
          foreignField: "_id",
          as: "detail.categlory",
        },
      },
      {
        $lookup: {
          from: "developers",
          localField: "detail.developer",
          foreignField: "_id",
          as: "detail.developer",
        },
      },
    ];
  }
  async getBestSeller() {
    const userLibrary = await this.libraly
      .aggregate([
        {
          $unwind: "$userProduct",
        },
        {
          $group: {
            _id: "$userProduct.product",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .limit(10);
    const ids = userLibrary.map((item: any) => {
      return item._id;
    });
    const product = await this.product.aggregate([
      {
        $match: { _id: { $in: ids } },
      },
      {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "productId",
          as: "detail",
        },
      },
      {
        $unwind: "$detail",
      },
      {
        $lookup: {
          from: "categlories",
          localField: "detail.categlory",
          foreignField: "_id",
          as: "detail.categlory",
        },
      },
      {
        $lookup: {
          from: "developers",
          localField: "detail.developer",
          foreignField: "_id",
          as: "detail.developer",
        },
      },
      {
        $unwind: "$detail.developer",
      },
    ]);
    // product.forEach(async (item: any) => {
    //   const itemID = await userLibrary.find((id: any) => {
    //     id._id = item._id;
    //   });
    //   item.count = itemID.count;
    // });
    return product;
  }
  async getProductNewRelease() {
    const products = await this.product
      .aggregate([
        {
          $lookup: {
            from: "productdetails",
            localField: "_id",
            foreignField: "productId",
            as: "detail",
          },
        },
        {
          $unwind: "$detail",
        },
        {
          $lookup: {
            from: "categlories",
            localField: "detail.categlory",
            foreignField: "_id",
            as: "detail.categlory",
          },
        },
        {
          $lookup: {
            from: "developers",
            localField: "detail.developer",
            foreignField: "_id",
            as: "detail.developer",
          },
        },
        {
          $unwind: "$detail.developer",
        },
      ])
      .limit(10);
    return products;
  }
  async getProductDetail(id: string) {
    const productDetail = await this.productDetail.aggregate([
      {
        $match: { productId: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "developers",
          localField: "developer",
          foreignField: "_id",
          as: "developer",
        },
      },
      { $unwind: "$developer" },
      {
        $lookup: {
          from: "categlories",
          localField: "categlory",
          foreignField: "_id",
          as: "categlory",
        },
      },
    ]);
    if (productDetail) {
      return productDetail[0];
    } else {
      throw new Error("product not found");
    }
  }
  async getProductsSameDeveloper(id: string) {
    const product = await this.product.aggregate([
      {
        $match: {
          developer: id,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product._id",
        },
      },
    ]);
    if (product) {
      return product[0];
    } else {
      throw new Error("product not found");
    }
  }
  async getProductSlide() {
    const slider = await this.homeSlide.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productId",
        },
      },
      {
        $lookup: {
          from: "productdetails",
          localField: "productId._id",
          foreignField: "productId",
          as: "productDetail",
        },
      },

      {
        $lookup: {
          from: "developers",
          localField: "productDetail.developer",
          foreignField: "_id",
          as: "developer",
        },
      },
      {
        $lookup: {
          from: "categlories",
          localField: "productDetail.categlory",
          foreignField: "_id",
          as: "categlory",
        },
      },
      { $unwind: "$developer" },
      {
        $unwind: "$productId",
      },
      {
        $unwind: "$productDetail",
      },
    ]);
    return slider;
  }
  async getProductSale() {
    const today = new Date();
    const saleProduct = await this.product
      .find({
        $and: [
          { "sale.salePersent": { $gt: 0 } },
          { "sale.startDay": { $gte: Number(today) } },
          { "sale.endDay": { $gte: Number(today) } },
        ],
      })
      .limit(30);
    if (saleProduct) {
      const getProduct = saleProduct.map((item: IProduct) => {
        return item._id;
      });
      const detail = await this.productDetail.aggregate([
        {
          $match: { productId: { $in: getProduct } },
        },
        {
          $lookup: {
            from: "developers",
            localField: "developer",
            foreignField: "_id",
            as: "developer",
          },
        },
        { $unwind: "$developer" },
        {
          $lookup: {
            from: "categlories",
            localField: "categlory",
            foreignField: "_id",
            as: "categlory",
          },
        },
      ]);
      const result = saleProduct.map((item: IProduct) => {
        const findDetail = detail.find((item1: IProductDetail) => {
          return String(item._id) == String(item1.productId);
        });
        return {
          product: item,
          detail: findDetail,
        };
      });
      return result;
    }
  }
  //   async filterProduct(req:Request){
  //     const { value, listCateglory, developer } = req.body;
  //     // const productDetail = await ProductDetail.find({
  //     //   categlory: { $all: listCateglory },
  //     // });
  //     const query = [
  //       {
  //         $match: {
  //           $or: [
  //             {
  //               price: { $gt: value[0], $lt: value[1] },
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "productdetails",
  //           localField: "_id",
  //           foreignField: "productId",
  //           as: "productDetail",
  //         },
  //       },
  //       { $unwind: "$productDetail" },
  //     ];

  //     if (developer && listCateglory == 0) {
  //       const devId = new Types.ObjectId(developer._id);
  //       query.push({
  //         $match: {
  //           "productDetail.developer": devId,
  //         },
  //       });

  //       const commonProduct1 = await this.model.aggregate([...query]);
  //       console.log("case1");
  //       res.json(commonProduct1);
  //     } else if (listCateglory && developer === "") {
  //       let aaa = listCateglory.map((item) => {
  //         return new Types.ObjectId(item._id);
  //       });
  //       query.push({
  //         $match: {
  //           "productDetail.categlory": { $all: aaa },
  //         },
  //       });
  //       const commonProduct2 = await Product.aggregate([...query]);
  //       console.log("case2");
  //       res.json(commonProduct2);
  //     } else if (developer !== "" && listCateglory.length != 0) {
  //       let aaa = listCateglory.map((item) => {
  //         return mongoose.Types.ObjectId(item._id);
  //       });
  //       const devId = mongoose.Types.ObjectId(developer._id);
  //       query.push({
  //         $match: {
  //           "productDetail.categlory": { $all: aaa },
  //         },
  //       });
  //       query.push({
  //         $match: {
  //           "productDetail.developer": devId,
  //         },
  //       });
  //       const commonProduct3 = await Product.aggregate([...query]);
  //       console.log("case3");
  //       res.json(commonProduct3);
  //     } else if (developer === "" && listCateglory.length == 0) {
  //       const commonProduct4 = await Product.aggregate([...query]);
  //       res.json(commonProduct4);
  //       console.log("case4");
  //     }
  //   })
}
