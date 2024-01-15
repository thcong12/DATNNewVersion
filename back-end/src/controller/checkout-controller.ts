import { Request, Response } from "express";
import { Model, Types } from "mongoose";
import { MyToken } from "../base/router-base";
import { CartModel, ICart } from "../model/user/CartModel";
import {
  IOrder,
  IOrderDetail,
  IOrderItem,
  OrderDetailModel,
  OrderModel,
} from "../model/user/CheckOut";
import { ILibraly, LibralyModel } from "../model/user/LibraryModel";
import { generateRefreshToken } from "../ultils/genareate_token";
import { CONSTANT } from "../constant";
import { activeAccount } from "../template/mailtemplate";
import { mailOrderDetail } from "../template/mailordertemplate";
import { AuthBaseController } from "../base/auth-controller-base";
import { IUser, IUserMethods, UserModel } from "../model/user/UserModel";

export class CheckOutController extends AuthBaseController<
  IUser,
  IUserMethods
> {
  private OrderModel: Model<IOrder> = OrderModel;
  private OrderDetailModel: Model<IOrderDetail> = OrderDetailModel;
  private LibraryModel: Model<ILibraly> = LibralyModel;
  private CartModel: Model<ICart> = CartModel;
  tranport: any;
  constructor() {
    super(UserModel);
  }
  async getUserLibarary(id: string) {
    const userLibrary = await this.LibraryModel.findOne({
      userId: id,
    });
    if (userLibrary) {
      return userLibrary;
    } else {
      const newUserLibrary = await this.LibraryModel.create({
        userId: id,
      });
      return newUserLibrary;
    }
  }
  async checkOut(user: MyToken, req: Request, res: Response) {
    const today = Date.now();
    const { orderItem } = req.body;
    if (orderItem.length <= 0) {
      res.sendStatus(400);
    }
    const newOrder = await this.OrderModel.create({
      ...req.body,
      paidAt: today,
      user: user.id,
    });
    if (newOrder) {
      const newDataOrder = orderItem.map((item: any) => {
        return {
          product: new Types.ObjectId(item._id),
        } as IOrderItem;
      });
      await this.OrderDetailModel.create({
        orderId: newOrder._id,
        orderItem: newDataOrder,
      });
    }
    res.status(201).send(newOrder);
  }
  async payOrder(order: any, user: MyToken, res: Response, productOrder?: any) {
    const today = Date.now();
    const userDetail = await this.getUserById(user.id);
    const userCart = await this.CartModel.findOne({ userId: user.id });
    const userLibrary = await this.LibraryModel.findOne({
      userId: user.id,
    });
    const orderDetais = await this.OrderDetailModel.aggregate([
      {
        $match: {
          orderId: new Types.ObjectId(order._id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItem.product",
          foreignField: "_id",
          as: "orderItem",
        },
      },
    ]);
    const updateOrder = await this.OrderModel.findByIdAndUpdate(
      order._id,
      {
        $set: {
          isPaid: true,
          paidAt: today,
        },
      },
      {
        new: true,
      }
    );
    const mailSubject: string = "Thank you";
    const mailText: string = "Your order";
    const token = generateRefreshToken(String(order._id));

    if (updateOrder) {
      orderDetais[0].orderItem.map((item: Types.ObjectId) => {
        userLibrary!.userProduct.push({
          orderId: order._id,
          product: item,
        });
      });

      userCart!.cartDetail = [];
      await userLibrary!.save();
      await userCart!.save();
      res.json(updateOrder);
    } else {
      res.status(404).send("Order not found");
      return;
    }
    const link = `http://localhost:${CONSTANT.port.clientFE}/home`;
    this.tranport.sendMail(
      this.mailOption(
        mailOrderDetail(
          orderDetais[0].orderItem,
          link,
          updateOrder,
          userDetail.userName
        ),
        userDetail,
        mailSubject,
        mailText
      ),
      function (err: any) {
        if (err) {
          console.log("Please check your email");
        } else {
          res.sendStatus(201);
        }
      }
    );
    return orderDetais[0].orderItem;
  }
}
