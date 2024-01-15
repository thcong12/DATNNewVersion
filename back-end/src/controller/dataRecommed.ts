import { Model, Types } from "mongoose";
import { ControllerBase } from "../base/controller-base";
import { recomendValue } from "../constant";
import {
  DataRecomendModel,
  IDataRecomend,
} from "../model/dataset/DataRecomend";
import {
  DataRecomendModelRaw,
  IDataRecomendRaw,
} from "../model/dataset/DataRecommend-raws";
import { CartModel, ICart } from "../model/user/CartModel";
import { ILibraly, LibralyModel } from "../model/user/LibraryModel";
import { IWishList, WishListModel } from "../model/user/WishlistModel";
import {
  DataRecomendNewModel,
  IDataRecomendNew,
} from "../model/dataset/DataRecomendModel";

export class SetDataController extends ControllerBase<IDataRecomend> {
  private DataRecomend: Model<IDataRecomend> = DataRecomendModel;
  private DataRecomendRaw: Model<IDataRecomendRaw> = DataRecomendModelRaw;
  private DataRecomendNew: Model<IDataRecomendNew> = DataRecomendNewModel;
  private CartModel: Model<ICart> = CartModel;
  private WishlistModel: Model<IWishList> = WishListModel;
  private LibraryModel: Model<ILibraly> = LibralyModel;

  constructor() {
    super(DataRecomendModel);
  }
  async defineData(id: string) {
    // const data = await this.DataRecomendRaw.find({
    //   userId: id,
    // });
    // for (let i = 0; i < data.length; i++) {
    //   const newData = await this.DataRecomendNew.create({
    //     userId: data[i].userId,
    //     productId: data[i].productId,
    //     click: data[i].click,
    //     cart: 0,
    //     buy: 0,
    //     wishlist: 0,
    //   });
    //   console.log(newData.productId);
    // }
    // return data;
  }
  async findUserData(item: IDataRecomend) {
    console.log(item.userId);
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
      let newDataRecomend: any = {
        click: recomendValue.click,
        cart: recomendValue.cart,
        wishlist: 0,
        isBuy: 0,
      };
      this.setData1(
        userCart,
        "cartDetail",
        item,
        "cart",
        recomendValue.cart,
        newDataRecomend
      );
    } else {
      console.log(item.userId + "no cart");
      await this.CartModel.create({ userId: item.userId });
    }
    if (userWishlist as IWishList) {
      let newDataRecomend: any = {
        click: recomendValue.click,
        cart: 0,
        wishlist: recomendValue.wishlist,
        isBuy: 0,
      };
      this.setData1(
        userWishlist,
        "userWishlist",
        item,
        "wishlist",
        recomendValue.wishlist,
        newDataRecomend
      );
      // (userWishlist as IWishList).userWishlist.map((wishList) => {
      //   const existProduct = (item as IDataRecomend).product.findIndex(
      //     (data) => {
      //       return String(data.productId) == String(wishList.product);
      //     }
      //   );
      //   let i = 1;
      //   console.log({ id: "wishList", count: i, isexist: existProduct });
      //   if (existProduct != -1) {
      //     for (let i = 0; i < item.product.length; i++) {
      //       if (String(item.product[i].productId) == String(wishList.product)) {
      //         item.product[i].wishlist = recomendValue.wishlist;
      //         console.log(item.product[i].wishlist);
      //         break;
      //       }
      //     }
      //   } else {
      //     let newDataRecomend: IData = {
      //       productId: wishList.product,
      //       click: recomendValue.click,
      //       cart: 0,
      //       wishlist: recomendValue.wishlist,
      //       isBuy: 0,
      //     };
      //     (item as IDataRecomend).product.push(newDataRecomend);
      //   }
      //   i += 1;
      // });
    } else {
      console.log(item.userId + "no wishList");
      await this.WishlistModel.create({ userId: item.userId });
    }
    if (userLibrary as ILibraly) {
      let newDataRecomend: any = {
        click: recomendValue.click,
        cart: recomendValue.cart,
        wishlist: 0,
        isBuy: recomendValue.buy,
      };
      this.setData1(
        userLibrary,
        "userProduct",
        item,
        "isBuy",
        recomendValue.buy,
        newDataRecomend
      );
      // (userLibrary as ILibraly).userProduct.map((library) => {
      //   const existProduct = (item as IDataRecomend).product.findIndex(
      //     (data) => {
      //       return String(data.productId) == String(library.product);
      //     }
      //   );
      //   let i = 1;
      //   console.log({ id: "library", count: i, isexist: existProduct });
      //   if (existProduct != -1) {
      //     for (let i = 0; i < item.product.length; i++) {
      //       if (String(item.product[i].productId) == String(library.product)) {
      //         item.product[i].isBuy = recomendValue.buy;
      //         break;
      //       }
      //     }
      //   } else {
      //     let newDataRecomend: IData = {
      //       productId: library.product,
      //       click: recomendValue.click,
      //       cart: recomendValue.cart,
      //       wishlist: 0,
      //       isBuy: recomendValue.buy,
      //     };
      //     (item as IDataRecomend).product.push(newDataRecomend);
      //   }
      //   i += 1;
      // });
    } else {
      console.log(item.userId + "no library");
      await this.LibraryModel.create({ userId: item.userId });
    }
    await this.model.insertMany(item);
  }
  async getDataRecomend() {
    // const data = await this.DataRecomend.aggregate([
    //   {
    //     $unwind: "$product",
    //   },
    // ]);
    // for (let i = 0; i < data.length; i++) {
    //   await this.DataRecomendNew.create({
    //     userId: data[i].userId,
    //     productId: data[i].product.productId,
    //     click: data[i].product.click,
    //     cart: data[i].product.cart,
    //     buy: data[i].product.buy,
    //     wishlist: data[i].product.wishlist,
    //   });
    // }
    // // const setNewData = await this.DataRecomendNew();
    // return data;
  }
  async insertData(data: IDataRecomend[]) {
    const result = await this.DataRecomend.insertMany(data);
    return result;
  }
  async defineData1() {
    const dataRaw = await this.DataRecomendRaw.aggregate([
      {
        $addFields: {
          product: [],
        },
      },
      {
        $group: {
          _id: "$userId",
          product: {
            $push: {
              cart: 0,
              wishlist: 0,
              isBuy: 0,
              productId: "$productId",
              click: "$click",
            },
          },
        },
      },
    ]);
    return dataRaw;
  }

  setData(data: any[]) {
    let newData: IDataRecomend[] = [];
    newData = data.map((item) => {
      return { userId: item._id, product: item.product };
    }) as IDataRecomend[];

    return newData;
  }

  findProduct(
    dataRecomend: any,
    productId: Types.ObjectId,
    key: string,
    value: number
  ) {
    for (let x = 0; x < dataRecomend.product.length; x++) {
      if (String(dataRecomend.product[x].productId) == String(productId)) {
        dataRecomend.product[x][key] = value;
        break;
      }
    }
  }
  setData1(
    user: any,
    key: string,
    recomend: IDataRecomend,
    key2: string,
    value: number,
    dataInput: any
  ) {
    for (let y = 0; y < user[key].length; y++) {
      const existProduct = recomend.product.findIndex((data) => {
        return String(data.productId) == String(user[key][y].product);
      });
      console.log({ id: key2, count: y, isexist: existProduct });
      if (existProduct != -1) {
        this.findProduct(recomend, user[key][y].product, key2, value);
      } else {
        dataInput.productId = user[key][y].product;
        recomend.product.push(dataInput);
      }
    }
  }
}
