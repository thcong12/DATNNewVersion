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
import { ProductControllerBase } from "../base/product-base-controller";
import {
  DataRecomendNewModel,
  IDataRecomendNew,
} from "../model/dataset/DataRecomendModel";
import { IValue } from "./recommend-controller";

export class HomePageController extends ProductControllerBase {
  private libraly: Model<ILibraly> = LibralyModel;
  private homeSlide: Model<IHomeSlide> = HomeSlideModel;
  private recomend: Model<IDataRecomendNew> = DataRecomendNewModel;
  constructor() {
    super();
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
    const products = await this.ProductModel.find({ _id: { $in: ids } });
    const productDetails = await this.getDetailInformation(products, "_id");
    const dataFinal = this.dataReturn(products, productDetails);
    return dataFinal;
  }
  async getProductNewRelease() {
    const products = await this.ProductModel.find({})
      .sort({ _id: -1 })
      .limit(10);
    const productDetails = await this.getDetailInformation(products, "_id");
    const dataFinal = this.dataReturn(products, productDetails);
    return dataFinal;
  }
  async getProductDetail(id: string) {
    const products = await this.ProductModel.find({
      _id: id,
    }).limit(1);
    const productDetail = await this.getDetailInformation(products, "_id");
    const dataFinal = this.dataReturn(products, productDetail);
    if (dataFinal) {
      return dataFinal;
    } else {
      throw new Error("product not found");
    }
  }
  async getProductSlide() {
    const homeSlide = (await this.homeSlide.find({})).map((item) => {
      return item.productId;
    });
    const products = await this.ProductModel.find({
      _id: { $in: homeSlide },
    });
    const productDetail = await this.getDetailInformation(products, "_id");
    const dataFinal = this.dataReturn(products, productDetail);
    return dataFinal;
  }
  async getProductSale() {
    const today = new Date();
    const products = await this.ProductModel.find({
      "sale.salePersent": { $gt: 0 },
    }).limit(30);
    if (products) {
      const productDetail = await this.getDetailInformation(products, "_id");
      const dataFinal = this.dataReturn(products, productDetail);
      return dataFinal;
    }
  }
  async filterProduct(req: Request) {
    const { price, category, developer } = req.body;
    let dataResult;
    let query = [];
    if (category.length > 0) {
      query.push({
        categlory: { $all: category },
      });
    }
    if (developer) {
      query.push({
        developer: developer,
      });
    }
    if (query.length > 0) {
      const dataFilter = (
        await this.ProductDetailModel.find({
          $and: query,
        })
      ).map((item) => {
        return String(item.productId);
      });

      dataResult = await this.ProductModel.find({
        $and: [
          {
            price: { $gte: price[0], $lte: price[1] },
          },
          {
            _id: { $in: dataFilter },
          },
        ],
      });
    } else {
      dataResult = await this.ProductModel.find({
        $and: [
          {
            price: { $gte: price[0], $lte: price[1] },
          },
        ],
      });
    }
    const productDetail = await this.getDetailInformation(dataResult, "_id");
    const dataFinal = this.dataReturn(dataResult, productDetail);
    return dataFinal;
  }

  async searchProduct(keyword: string) {
    let products = [];
    console.log(keyword);
    if (keyword) {
      products = await this.ProductModel.find({
        productName: { $regex: keyword, $options: "i" },
      });
    } else {
      products = await this.ProductModel.find({});
    }
    const productDetail = await this.getDetailInformation(products, "_id");
    const dataFinal = this.dataReturn(products, productDetail);
    return dataFinal;
  }
}
