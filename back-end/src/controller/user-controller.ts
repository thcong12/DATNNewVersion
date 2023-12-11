import { Model, Types } from "mongoose";
import { AuthBaseController } from "../base/auth-controller-base";
import { CONSTANT } from "../constant";
import { AdminModel, IAdmin, IAdminrMethods } from "../model/admin/AdminModel";
import { CartModel, ICart } from "../model/user/CartModel";
import { checkSection, checkUser } from "../ultils/genareate_token";
import { NextFunction, Request, Response } from "express";
import { ILibraly, LibralyModel } from "../model/user/LibraryModel";
export class UserController {
  private CartModel: Model<ICart> = CartModel;
  private LibraryModel: Model<ILibraly> = LibralyModel;
  constructor() {}
  async getUserCart(userId: string) {
    const userCart = await this.CartModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "cartDetail.product",
          foreignField: "_id",
          as: "cartDetail",
        },
      },
    ]);
    if (userCart) {
      return userCart[0];
    }
  }
  async addToCart(req: Request, res: Response) {
    const { product, quantity } = req.body;
    const user = checkSection(req);
    if (user) {
      const data = await this.getUserCart(user.id!);
      const existProduct = data.cartDetail.findIndex((item: any) => {
        return String(product) == String(item.product);
      });
      if (existProduct == -1) {
        const newCartItem = await this.CartModel.create({
          product: product,
          quantity: quantity,
        });
        res.status(201).json({ newCartItem: newCartItem });
      } else {
        res.json("Product is already have in cart ");
      }
    } else {
      res.status(403);
    }
  }
  async removeUserCart(req: Request, res: Response) {
    const { product } = req.body;
    const user = checkSection(req);
    if (user) {
      const data = await this.getUserCart(user.id!);
      const existProduct = data.cartDetail.findIndex((item: any) => {
        return String(product) == String(item.product);
      });
      if (existProduct != -1) {
        await this.CartModel.deleteOne({
          product: product,
        });
        res.status(201);
      } else {
        res.json("Product isn't have your cart ");
      }
    } else {
      res.status(403);
    }
  }
}
