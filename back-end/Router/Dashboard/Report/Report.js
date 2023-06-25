import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../../model/Product/Product.js";
import Order from "../../../model/Store/Order.js";
import Library from "../../../model/User/Library.js";
import User from "../../../model/User/User.js";

const adminReportRouter = express.Router();

adminReportRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const amount = await Order.find({ isActive: true });
    const product = await Product.find({});
    const user = await User.find({});
    let result = {
      totalAmount: 0,
      userCount: 0,
      productCount: 0,
    };
    amount.map((data) => {
      result.totalAmount += data.totalPrice;
    });
    result.productCount = product.length;
    result.userCount = user.length;
    res.json(result);
  })
);
adminReportRouter.get(
  "/amount/year/:number",
  asyncHandler(async (req, res) => {
    const number = req.params.number;
    const order = await Order.find({ isActive: true });
    const product = await Product.find({});
    const user = await User.find({ isActive: true });
    let resultForOrder = [];
    let resultForUser = [];
    let resultForProduct = [];
    for (let i = 0; i <= 11; i++) {
      resultForOrder.push({ date: `${i}`, value: 0 });
      resultForUser.push({ date: `${i}`, value: 0 });
      resultForProduct.push({ date: `${i}`, value: 0 });
    }

    function getValue(data, array) {
      const newArray = data.filter((item) => {
        return item.updatedAt.getFullYear() == number;
      });

      newArray.forEach((item) => {
        for (let i = 0; i <= array.length; i++) {
          switch (item.updatedAt.getMonth()) {
            case i: {
              if (item.totalPrice) {
                return (array[i].value += item.totalPrice);
              }

              return (array[i].value += 1);
            }
          }
        }
      });
    }
    getValue(order, resultForOrder);
    getValue(product, resultForProduct);
    getValue(user, resultForUser);

    res.json({
      product: resultForProduct,
      user: resultForUser,
      order: resultForOrder,
    });
  })
);
adminReportRouter.get(
  "/amount/mounth",
  asyncHandler(async (req, res) => {
    const order = await Order.find({ isActive: true });
    const thisMonth = new Date();
    console.log(thisMonth.getMonth());
    let result = [];
    for (let i = 1; i <= 31; i++) {
      result.push({ date: `${i}`, value: 0 });
    }

    function getData(data, array) {
      const newArray = data.filter((item) => {
        return item.updatedAt.getMonth() == thisMonth.getMonth();
      });
      newArray.forEach((item) => {
        for (let i = 1; i <= result.length; i++) {
          switch (item.updatedAt.getDate()) {
            case i: {
              if (item.totalPrice) {
                return (array[i].value += item.totalPrice);
              }
              return (array[i].value += 1);
            }
          }
        }
      });
    }
    getData(order,result)
    res.json(result);
  })
);
adminReportRouter.get(
  "/bestseller",
  asyncHandler(async (req, res) => {
    const userLibrary = await Library.aggregate([
      {
        $unwind: "$userProduct",
      },
      {
        $group: {
          _id: "$userProduct.product",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "_id",
        },
      },
      {
        $unwind: "$_id",
      },
    ]);
    const newList = userLibrary.sort((a, b) => {
      return b.count - a.count;
    });
    res.json(newList.slice(0, 10));
  })
);

export default adminReportRouter;
