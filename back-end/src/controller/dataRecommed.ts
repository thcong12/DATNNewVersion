import { Model, Types } from "mongoose";
import { ControllerBase } from "../base/controller-base";
import {
  DataRecomendModel,
  IData,
  IDataRecomend,
} from "../model/dataset/DataRecomend";
import {
  DataRecomendModelRaw,
  IDataRecomendRaw,
} from "../model/dataset/DataRecommend-raws";
import { CityModel, ICity } from "../model/user/CityModel";
import { CartModel, ICart } from "../model/user/CartModel";
import { ILibraly, LibralyModel } from "../model/user/LibraryModel";
import { IWishList, WishListModel } from "../model/user/WishlistModel";
import { recomendValue } from "../constant";

export class SetDataController extends ControllerBase<IDataRecomend> {
  private DataRecomend: Model<IDataRecomend> = DataRecomendModel;
  private CartModel: Model<ICart> = CartModel;
  private WishlistModel: Model<IWishList> = WishListModel;
  private LibraryModel: Model<ILibraly> = LibralyModel;

  constructor() {
    super(DataRecomendModel);
  }
  async defineData(id: string) {
    const dataRaw = await this.DataRecomend.findOne({
      userId: id,
    });
    return dataRaw;
  }
  async findUserData(item: IDataRecomend) {
    const userLibrary: any = await this.LibraryModel.findOne({
      userId: new Types.ObjectId(item.userId),
    });
    const userWishlist: any = await this.WishlistModel.findOne({
      userId: new Types.ObjectId(item.userId),
    });
    const userCart: any = await this.CartModel.findOne({
      userId: new Types.ObjectId(item.userId),
    });

    // const dataRecomend: any = await this.DataRecomend.findOne({
    //   userId: new Types.ObjectId(id),
    // });
    if (userCart as ICart) {
      (userCart as ICart).cartDetail.forEach((cart) => {
        const existProduct: IData | undefined = this.findProduct(
          item,
          cart.product
        );
        if (existProduct) {
          existProduct.cart = recomendValue.cart;
        } else {
          let newDataRecomend: IData = {
            productId: cart.product,
            click: recomendValue.click,
            cart: recomendValue.cart,
            wishlist: 0,
            isBuy: 0,
          };
          (item as IDataRecomend).product.push(newDataRecomend);
        }
      });
    } else {
      await this.CartModel.create({ userId: item.userId });
    }
    if (userWishlist as IWishList) {
      (userWishlist as IWishList).userWishlist.forEach((wishList) => {
        const existProduct: IData | undefined = this.findProduct(
          item,
          wishList.product
        );
        if (existProduct) {
          existProduct.wishlist = recomendValue.wishlist;
        } else {
          let newDataRecomend: IData = {
            productId: wishList.product,
            click: recomendValue.click,
            cart: 0,
            wishlist: recomendValue.wishlist,
            isBuy: 0,
          };
          (item as IDataRecomend).product.push(newDataRecomend);
        }
        // return String(cart.product) == String(item.productId);
      });
    } else {
      await this.WishlistModel.create({ userId: item.userId });
    }
    if (userLibrary as ILibraly) {
      (userLibrary as ILibraly).userProduct.forEach((library) => {
        const existProduct: IData | undefined = this.findProduct(
          item,
          library.product
        );
        if (existProduct) {
          existProduct.isBuy = recomendValue.buy;
        } else {
          let newDataRecomend: IData = {
            productId: library.product,
            click: recomendValue.click,
            cart: recomendValue.cart,
            wishlist: 0,
            isBuy: recomendValue.buy,
          };
          (item as IDataRecomend).product.push(newDataRecomend);
        }
        // return String(cart.product) == String(item.productId);
      });
    } else {
      await this.LibraryModel.create({ userId: item.userId });
    }
    return item;
  }
  async getDataRecomend() {
    const data = await this.DataRecomend.find({}).exec();
    return data;
  }
  findProduct(dataRecomend: IDataRecomend, productId: Types.ObjectId) {
    const existProduct: IData | undefined = (
      dataRecomend as IDataRecomend
    ).product.find((data) => {
      String(data.productId) == String(productId);
    });
    return existProduct;
  }
}
