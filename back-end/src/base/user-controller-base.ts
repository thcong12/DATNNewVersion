import { Model, Types } from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import { MyToken, checkSection } from "../ultils/genareate_token";
export class UserControllerBase<T> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async getData(userId: string): Promise<T | any> {
    const data = await this.model.findOne({ userId: userId }).exec();
    if (data) {
      return data;
    } else {
      const newData = await this.model.create({ userId: userId });
      return newData;
    }
  }
  async getDetail(
    userId: string,
    localField: string,
    saveAs: string
  ): Promise<T | any> {
    const data = await this.model.findOne({ userId: userId }).exec();
    if (data) {
      const userData = await this.model.aggregate([
        {
          $match: {
            userId: new Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: localField,
            foreignField: "_id",
            as: saveAs,
          },
        },
      ]);
      console.log(userData);
      return userData[0];
    } else {
      await this.model.create({ userId: userId });
      const newuserData = await this.model.aggregate([
        {
          $match: {
            userId: new Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: localField,
            foreignField: "_id",
            as: saveAs,
          },
        },
      ]);
      return newuserData[0];
    }
  }

  async addEvent(
    req: Request,
    res: Response,
    next: NextFunction,
    tableKey: string
  ) {
    const dataBody: T | any = req.body;
    const user: MyToken = checkSection(req, res, next);
    if (user.id) {
      const data: any = await this.model.findOne({ userId: user.id }).exec();
      const existProduct = data[tableKey].findIndex((item: any) => {
        return String(dataBody._id) == String(item.product);
      });
      if (existProduct == -1) {
        data[tableKey].push({
          ...dataBody,
          product: dataBody._id,
        });
        await data.save();
        res.status(201);
      } else {
        res.json("Product is already exist ");
      }
    } else {
      res.status(403);
    }
  }
  async eventRemove(
    req: Request,
    res: Response,
    next: NextFunction,
    tableKey: string
  ) {
    const dataBody: T | any = req.body;
    const user: MyToken = checkSection(req, res, next);
    if (user.id) {
      const data: any = await this.model.findOne({ userId: user.id }).exec();
      const existProduct = data[tableKey].findIndex((item: any) => {
        return String(dataBody._id) == String(item.product);
      });
      if (existProduct != -1) {
        data[tableKey] = data[tableKey].filter((item: any) => {
          return String(dataBody._id) != String(item.product);
        });
        await data.save();
        res.status(201);
      } else {
        res.json("Product isn't have ");
      }
    } else {
      res.status(403);
    }
  }
}
