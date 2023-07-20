import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../../../model/Product/Product.js";
import ProductDetail from "../../../model/Product/ProductDetail.js";

import protect from "../../../middleware/Auth.js";
import checkRole from "../../../middleware/AuthRole.js";
import mongoose from "mongoose";
import Library from "../../../model/User/Library.js";
import User from "../../../model/User/User.js";
import nodemailer from "nodemailer";
import { CONSTANT_ID } from "../../../constant/index.js";
const adminProductRouter = express.Router();

adminProductRouter.use(protect, checkRole(CONSTANT_ID.ROLE_ID.TD));
//get all products
adminProductRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//get single product
adminProductRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  })
);
adminProductRouter.get(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const productDetail = await ProductDetail.aggregate([
      {
        $match: { productId: mongoose.Types.ObjectId(req.params.id) },
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
      // { $project:  { cateName:1,description:1 } },
    ]);
    const newProductDetail = new ProductDetail({
      productId: req.params.id,
      developer: CONSTANT_ID.DEAFAULT_VALUE.DEVELOPER,
      categlory: CONSTANT_ID.DEAFAULT_VALUE.CATEGLORY,
      feature: CONSTANT_ID.DEAFAULT_VALUE.FEATURE,
    });
    if (productDetail) {
      res.json(productDetail[0]);
    } else {
      const createNewProductDetail = await newProductDetail.save();
      console.log("product have create");
      res.json(createNewProductDetail);
    }
  })
);
//Post data from file
adminProductRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      productName,
      shortDescription,
      discount,
      sale,
      imgX,
      imgY,
      isActive,
      price,
    } = req.body;
    const product = new Product({
      productName,
      shortDescription,
      discount,
      imgX,
      imgY,
      isActive,
      price,
      sale,
    });
    const prodExist = await Product.findOne({ productName });

    if (prodExist) {
      res.status(400);
      throw new Error("Product doesn't add");
    } else {
      const productDetail = new ProductDetail({
        productId: product._id,
        developer: DEAFAULT_VALUE.DEVELOPER,
        categlory: DEAFAULT_VALUE.CATEGLORY,
      });
      const productDetailExist = await ProductDetail.findOne({
        productId: product._id,
      });
      if (productDetailExist) {
        res.status(402);
      }
      const createNewProduct = await product.save();
      const createNewProductDetail = await productDetail.save();
      res.status(201).json({ createNewProduct, createNewProductDetail });
    }
  })
);
adminProductRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { productName, shortDescription, imgX, imgY, isActive, price, salePersent } =
      req.body;
    const product = await Product.findById(req.params.id)
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          productName,
          shortDescription,
          imgX,
          imgY,
          isActive,
          price,
          salePersent,
        },
      },
      {
        new: true,
      }
    );
    console.log(salePersent)
    if (updateProduct) {
      if(product.sale.salePersent != salePersent){
        getProductInUserLibry(product._id)
        return;
      }
      res.json({ updateProduct });  
    } else {
      res.status(404);
      throw new Error("Product glory not found");
    }
  })
);
adminProductRouter.put(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    const {
      categlory,
      description,
      developer,
      imgList,
      rating,
      systemrequiment,
    } = req.body;

    const product = await ProductDetail.findOneAndUpdate(
      { productId: req.params.id },
      {
        $set: {
          categlory,
          description,
          developer,
          imgList,
          rating,
          systemrequiment,
        },
      },
      {
        new: true,
      }
    );
    if (product) {
      res.json({ product });
    } else {
      res.status(404);
      throw new Error("Product glory not found");
    }
  })
);


const getProductInUserLibry = async (productId)=>{
  const libary = await Library.find()
  const product = await Product.findById(productId)
  
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
  libary.map(async item =>{
    const  isHaveProductId = item.productId.indexOf(productId)
    if(isHaveProductId){
      const userDetail = await User.findById(item.userId)
      const mailOptions = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: userDetail.email, // list of receivers
        subject: "Confirm Your Email", // Subject line
        text: "Hello world?", // plain text body
        html: `Co ve nhu ban dang hung thu de tro choi nay ${product.productName}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json("Please check your email");
        } else {
          console.log("Message sent: %s", info.messageId);
          console.log(
            "Preview URL: %s",
            nodemailer.getTestMessageUrl(info)
          );
          res.json({
            message: "Email has been sent--Please confirm",
          });
        }
      });
    }
  })

  
}
export default adminProductRouter;
