import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { CONSTANT } from "../constant";
import { IAuthBase, MAuthBase } from "../model/base/auth";
import {
  MyToken,
  checkUser,
  generateAccessToken,
  generateRefreshToken,
} from "../ultils/genareate_token";
import jwt from "jsonwebtoken";

export abstract class AuthBaseController<T, M> {
  protected model: Model<T, {}, M>;
  constructor(model: Model<T, {}, M>) {
    this.model = model;
  }
  protected getAccessToken(req: Request) {
    const token = req.header(CONSTANT.header.accessToken);
    if (token) {
      return token;
    }
  }
  protected getRefreshToken(req: Request) {
    const token = req.header(CONSTANT.header.refreshToken);
    if (token) {
      return token;
    }
  }
  async getUserVar(key: any, value: any): Promise<T | any> {
    const data = await this.model.findOne({ [key]: value });
    if (data) {
      return data;
    }
    return;
  }
  async getUserById(value: any): Promise<T | any> {
    const data = await this.model.findById(value);
    if (data) {
      return data;
    }
    return;
  }

  public async login(req: Request, res: Response) {
    const { userName, password } = req.body;
    const user = await this.getUserVar("userName", userName);
    if (user && user.matchPassword(password)) {
      const refreshTk = generateRefreshToken(user._id);
      const accessTk = generateAccessToken(user._id, userName);
      if (Array.isArray(user.section)) {
        user.section.push(refreshTk);
      } else {
        user.refreshToken = refreshTk;
      }
      await user.save();
      res
        .header(CONSTANT.header.refreshToken, refreshTk)
        .header(CONSTANT.header.accessToken, accessTk)
        .json({ userName: userName });
      res.status(200);
    } else {
      res.status(401);
      throw new Error("Some thing wrong please check user name or password");
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    // const authHeader = req.header(CONSTANT.header.refreshToken);
    // let value: any;
    const authHeader: any = req.header(CONSTANT.header.refreshToken);
    if (!authHeader) {
      return res.sendStatus(401);
    } else {
      const userId = checkUser(res, authHeader, next);

      const user = await this.getUserById(userId.id);
      // if (Array.isArray(user.section)) {
      //   //
      // } else {
      //   user.section = "";
      // }
      // await user.save();
      console.log(user);
      res.send("Goodbye");
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    // const userId = checkUser(req, res, next);
    // const user = await this.getUserById(userId);
    // if (Array.isArray(user.section)) {
    //   //
    // } else {
    //   //
    // }
    // await user.save();
    // res.sendStatus(204);
  }
}
