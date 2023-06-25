import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import userAuth from "../../../middleware/UserAuth.js";
import Cart from "../../../model/User/Cart.js";
import DataSetForProduct from "../../../model/Recomend/DataSetForProduct.js";
const cartRouter = express.Router();
cartRouter.use(userAuth);
//get all categlorys
cartRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const userId = req.user_id;
    const userCart = await Cart.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
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
    console.log()
    if (!userCart) {
      const newCart = new Cart.create({
        userId: userId,
      });
      await newCart.save();
      return res.status(201).json(newCart);
    }
    return res.status(200).json(userCart);
  })
);
//get single categlory
cartRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { product, quantity } = req.body;
    const userId = req?.user_id;
    const userCart = await Cart.findOne({ userId: userId });
    const data = await DataSetForProduct.findOne({
      productId: product,
      userId: userId,
    });
    let itemIndex = userCart.cartDetail.find((p) => p.product == product);
    if (userCart) {
      if (itemIndex) {
        res.json("Product is already have in cart ");
      } else {
        data.click += 2
        console.log(data.click)
        await data.save()
        userCart.cartDetail.push({ product: product, quantity: quantity });
      }
      const result = await userCart.save();
      return res.status(201).send(result);
    } else {
      const newCart = new Cart.create({
        userId: userId,
        cartDetail: [{ product: product, quantity: quantity }],
      });
      data.click += 2
      await data.save()
      return res.status(201).json(newCart);
    }
  })
);
cartRouter.get(
  "/removeproduct/:id",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const userId = req.user_id;
    const userCart = await Cart.findOne({ userId: userId });
    if (userCart) {
      userCart.cartDetail = userCart.cartDetail.filter((data) => {
        return String(data.product) !== productId;
      });
      const result = await userCart.save();
      return res.status(201).send(result);
    }
    return res.status(400).json("something wrong");
  })
);
// //Post data from file
// productRouter.post("/importdata",asyncHandler (async (req,res) =>{
//     await Product.remove({})
//     const importProduct = await Product.insertMany(products)
//     res.send({importProduct})
// }))
export default cartRouter;
