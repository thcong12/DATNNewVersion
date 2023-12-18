import { NextFunction, Request, Response } from "express";
import { Model, Types } from "mongoose";
import { CartModel, ICart } from "../model/user/CartModel";
import { ILibraly } from "../model/user/LibraryModel";
import { IWishList, WishListModel } from "../model/user/WishlistModel";
import { MyToken, checkSection } from "../ultils/genareate_token";
import { UserControllerBase } from "../base/user-controller-base";
export class UserController {
  constructor() {
    // this.CartModel = new UserControllerBase<ICart>(CartModel);
  }
  // async getUserCart(userId: string) {
  //   const userCart = await this.CartModel.aggregate([
  //     {
  //       $match: {
  //         userId: new Types.ObjectId(userId),
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "products",
  //         localField: "cartDetail.product",
  //         foreignField: "_id",
  //         as: "cartDetail",
  //       },
  //     },
  //   ]);
  //   if (userCart) {
  //     return userCart[0];
  //   } else {
  //     return {};
  //   }
  // }

  // async getCart(userId: string) {
  //   const cart = await this.CartModel.findOne({ userId: userId }).exec();
  //   if (cart) {
  //     return cart;
  //   } else {
  //     const newCart = await this.CartModel.create({ userId: userId });
  //     return newCart;
  //   }
  // }
  // async addToCart(req: Request, res: Response, next: NextFunction) {
  //   const { _id, quantity } = req.body;
  //   const user: MyToken = checkSection(req, res, next);
  //   if (user.id) {
  //     const data = await this.getCart(user.id!);
  //     const existProduct = data.cartDetail.findIndex((item: any) => {
  //       return String(_id) == String(item.product);
  //     });
  //     if (existProduct == -1) {
  //       data.cartDetail.push({
  //         product: _id,
  //         quantity: quantity,
  //       });
  //       await data.save();

  //       res.status(201);
  //     } else {
  //       res.json("Product is already have in cart ");
  //     }
  //   } else {
  //     res.status(403);
  //   }
  // }
  // async removeFromCart(req: Request, res: Response, next: NextFunction) {
  //   const { _id } = req.body;
  //   const user: any = checkSection(req, res, next);
  //   if (user) {
  //     const data = await this.getCart(user.id!);
  //     const existProduct = data.cartDetail.findIndex((item: any) => {
  //       return String(_id) == String(item.product);
  //     });
  //     if (existProduct != -1) {
  //       await this.CartModel.deleteOne({
  //         product: _id,
  //       });
  //       res.status(201);
  //     } else {
  //       res.json("Product isn't have your cart ");
  //     }
  //   } else {
  //     res.status(403);
  //   }
  // }

  // async getUserWishlist(userId: string) {
  //   const userCart = await this.WishListModel.aggregate([
  //     {
  //       $match: {
  //         userId: new Types.ObjectId(userId),
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "products",
  //         localField: "cartDetail.product",
  //         foreignField: "_id",
  //         as: "cartDetail",
  //       },
  //     },
  //   ]).exec();
  //   if (userCart) {
  //     return userCart[0];
  //   } else {
  //     return {};
  //   }
  // }
  // async getWishlist(userId: string) {
  //   const Wishlist = await this.WishListModel.findOne({
  //     userId: userId,
  //   }).exec();
  //   if (Wishlist) {
  //     return Wishlist;
  //   } else {
  //     const newWishlist = await this.WishListModel.create({ userId: userId });
  //     return newWishlist;
  //   }
  // }
  // async addToWishlist(req: Request, res: Response, next: NextFunction) {
  //   const { _id } = req.body;
  //   const user: MyToken = checkSection(req, res, next);
  //   if (user.id) {
  //     const data = await this.getWishlist(user.id!);
  //     const existProduct = data.productId.findIndex((item: any) => {
  //       return String(_id) == String(item.product);
  //     });
  //     if (existProduct == -1) {
  //       data.productId.push({
  //         product: _id,
  //       });
  //       await data.save();

  //       res.status(201);
  //     } else {
  //       res.json("Product is already have in wishList ");
  //     }
  //   } else {
  //     res.status(403);
  //   }
  // }
  // async removeFromWishlist(req: Request, res: Response, next: NextFunction) {
  //   const { _id } = req.body;
  //   const user: any = checkSection(req, res, next);
  //   if (user) {
  //     const data = await this.getWishlist(user.id!);
  //     const existProduct = data.productId.findIndex((item: any) => {
  //       return String(_id) == String(item.product);
  //     });
  //     if (existProduct != -1) {
  //       await this.CartModel.deleteOne({
  //         product: _id,
  //       });
  //       res.status(201);
  //     } else {
  //       res.json("Product isn't have your wishList ");
  //     }
  //   } else {
  //     res.status(403);
  //   }
  // }
}
