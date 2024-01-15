import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { CONSTANT } from "../constant";
import { IAuthBase, MAuthBase } from "../model/base/auth";
import {
  MyToken,
  checkSection,
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
        .json({ user: user.userName });
    } else {
      res.status(401);
      throw new Error("Some thing wrong please check user name or password");
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
    value: string
  ) {
    const decode: MyToken = checkUser(req, res, next);
    const refreshToken = this.getRefreshToken(req);
    const user = await this.getUserById(decode.id);
    if (Array.isArray(user[value])) {
      const newSection = user[value].filter((item: any) => {
        return item != refreshToken;
      });
      user[value] = newSection;
    } else {
      user[value] = "";
    }
    const result = await user.save();
    res.sendStatus(204);
  }
  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    const decode: MyToken = checkUser(req, res, next);
    if (decode.id) {
      const user = await this.getUserById(decode.id);
      const accessTk = generateAccessToken(user._id, user.userName);
      res.header(CONSTANT.header.accessToken, accessTk).json("ok");
    } else {
      res.status(401);
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
  protected mailOption(
    html: string,
    user: IAuthBase,
    mailSubject: string,
    mailText: string
  ) {
    const option: Mail.Options = {
      from: process.env.EMAIL_USERNAME, // sender address
      to: user.email, // list of receivers
      subject: mailSubject, //"Confirm Your Email", // Subject line
      text: mailText, // "Hello world?", // plain text body
      html: html,
    };
    return option;
  }
}
