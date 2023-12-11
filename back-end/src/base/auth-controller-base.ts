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
import { IUser } from "../model/user/UserModel";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
export abstract class AuthBaseController<T, M> {
  protected model: Model<T, {}, M>;
  protected tranport!: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(model: Model<T, {}, M>) {
    this.model = model;
    this.createTranport();
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
        .json({ user: user });
    } else {
      res.status(401);
      throw new Error("Some thing wrong please check user name or password");
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    const userId: any = checkUser(req);
    const refreshToken = this.getRefreshToken(req);
    const user = await this.getUserById(userId.id);
    if (Array.isArray(user.section)) {
      user.section = user.section.filter((item: any) => {
        return item != refreshToken;
      });
    } else {
      user.refreshToken = "";
    }
    await user.save();
    // console.log(user);
    res.send("Goodbye");
  }
  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    const userId: any = checkUser(req);

    if (userId) {
      const user = await this.getUserById(userId.id);
      const accessTk = generateAccessToken(user._id, user.userName);
      res
        .header(CONSTANT.header.accessToken, accessTk)
        .json({ userName: user.userName });
      res.status(200);
    } else {
      res.status(403);
    }
  }
  private createTranport() {
    this.tranport = nodemailer.createTransport({
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
  }
  protected mailOption(html: string, user: IAuthBase) {
    const option: Mail.Options = {
      from: process.env.EMAIL_USERNAME, // sender address
      to: user.email, // list of receivers
      subject: "Confirm Your Email", // Subject line
      text: "Hello world?", // plain text body
      html: html,
    };
    return option;
  }
}
