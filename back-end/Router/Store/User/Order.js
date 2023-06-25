import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import userAuth from "../../../middleware/UserAuth.js";
import Order from "../../../model/Store/Order.js";
import OrderDetail from "../../../model/Store/OrderDeatil.js";
import Cart from "../../../model/User/Cart.js";
import Library from "../../../model/User/Library.js";
import User from "../../../model/User/User.js";
import nodemailer from "nodemailer";
import { createEmailTemplate } from "./sendEmail.js";
const orderRouter = express.Router();

orderRouter.use(userAuth);
orderRouter.post(
  "/neworder",
  asyncHandler(async (req, res) => {
    const userId = req.user_id;
    const user = await User.findById(userId);
    const { totalPrice, disCountCode, paymentMethod, address, orderItem } =
      req.body;
    if (orderItem.length <= 0) {
      res.status(400).send("Cart empty");
    }
    console.log(orderItem);
    const newOrder = new Order({
      user: userId,
      totalPrice,
      disCountCode,
      paymentMethod,
      address,
    });
    const newOrderDetail = new OrderDetail({
      orderItem: orderItem.map((item) => {
        return { qty: 1, product: item._id };
      }),
      orderId: newOrder._id,
    });
    console.log(newOrderDetail);
    await newOrder.save();
    await newOrderDetail.save();
    res.status(201).send(newOrder);
  })
);
orderRouter.put(
  "/pay/:order",
  asyncHandler(async (req, res, next) => {
    const today = Date.now();
    const orderId = req.params.order;
    const userCart = await Cart.findOne({ userId: req.user_id });
    const userLibrary = await Library.findOne({ userId: req.user_id });
    const userOrderDetail = await OrderDetail.findOne({ orderId: orderId });
    const productList = userOrderDetail.orderItem.map((item) => {
      return {
        product: item.product,
        orderId: orderId,
      };
    });
    const orderDetais = await OrderDetail.aggregate([
      {
        $match: {
          orderId: mongoose.Types.ObjectId(orderId),
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
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
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
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // sender address
      to: req?.user_email, // list of receivers
      subject: "Thank you", // Subject line
      text: "Your order", // plain text body
      html: createEmailTemplate(orderDetais[0],updateOrder,0),
    };
    if (updateOrder) {
      if (userLibrary) {
        productList.map((item) => {
          userLibrary.userProduct.push(item);
        });
        userCart.cartDetail = [];
        await userLibrary.save();
        await userCart.save();
        res.json(updateOrder);
      } else if (!userLibrary) {
        const newUserLibrary = new Library({
          userId: req.user_id,
          userProduct: productList,
        });
        await newUserLibrary.save();
        console.log("Library have been create");
        userCart.cartDetail = [];
        await userCart.save();
        res.json(updateOrder);
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json("Please check your email");
        } else {
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.json({
            message: "Email has been sent--Please confirm",
          });
        }
      });
    } else {
      res.status(404).send("Order not found");
    }
  })
);
orderRouter.get(
  "/userorder",
  asyncHandler(async (req, res) => {
    const userId = req.user_id;
    const userOrder = await Order.find({ user: userId });
    if (!userOrder) {
      res.status(404);
    } else {
      res.send(userOrder);
    }
  })
);

orderRouter.get(
  "/getorder/:id",
  asyncHandler(async (req, res) => {
    const orderId = mongoose.Types.ObjectId(req.params.id);
    const userOrder = await OrderDetail.aggregate([
      {
        $match: {
          orderId: orderId,
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "orderId",
          foreignField: "_id",
          as: "orderId",
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
    if (!userOrder) {
      res.status(404);
    } else {
      res.send({
        order: userOrder[0].orderId[0],
        orderItem: userOrder[0].orderItem,
      });
    }
  })
);
export default orderRouter;
