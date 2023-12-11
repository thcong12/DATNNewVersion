import { Model } from "mongoose";
import { AuthBaseController } from "../base/auth-controller-base";
import { CONSTANT } from "../constant";
import { AdminModel, IAdmin, IAdminrMethods } from "../model/admin/AdminModel";
import {
  IUser,
  IUserMethods,
  IUserProfile,
  UserModel,
  UserProfileModel,
} from "../model/user/UserModel";
import { checkUser, generateRefreshToken } from "../ultils/genareate_token";
import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import { activeAccount } from "../template/mailtemplate";

export class ClientAuthController extends AuthBaseController<
  IUser,
  IUserMethods
> {
  private UserProfile: Model<IUserProfile> = UserProfileModel;
  constructor() {
    super(UserModel);
  }

  async signin(req: Request, res: Response) {
    const userReq: IAdmin = req.body; //?
    const existUser = this.getUserVar("userName", userReq.userName);
    if (!existUser) {
      const newUser = await this.model.create({
        userReq,
      });
      const profile = await this.UserProfile.create({
        fullName: userReq.fullName,
        userId: newUser._id,
      });
      // const saveuser = await newUser.save();
      if (newUser) {
        const token = generateRefreshToken(String(newUser._id));
        const link = `http://localhost:${CONSTANT.port.clientFE}/auth/userActice/${token}`;
        this.tranport.sendMail(
          this.mailOption(activeAccount(newUser.userName, link), newUser),
          function (err) {
            if (err) {
              res.json("Please check your email");
            } else {
              res.json({
                message: "Email has been sent--Please confirm",
              });
            }
          }
        );
      }
    }

    // if (newUser && admin.matchPassword(userReq.password)) {
    //   this.processAfterLogin(req, res, async (token: any) => {
    //     admin.refreshToken = token;
    //     await admin.save();
    //   });
    // } else {
    //   res.status(401);
    //   throw new Error("Some thing wrong please check user name or password");
    // }
  }

  // async refreshToken(req: Request, res: Response) {
  //   const token = req.header(CONSTANT.header.refreshToken);
  //   const admin = await this.AdminM.findOne({ refreshToken: token }).exec();
  //   if (!admin) {
  //     return res.sendStatus(401);
  //   } else {
  //     const refreshToken = generateRefreshToken(admin._id);
  //     const accessToken = generateAccessToken(admin._id, admin.role);

  //     //call function verify refresh token

  //     // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //     //   if (err || admin.id !== decoded.id) return res.sendStatus(403);
  //     //   res
  //     //     .header(
  //     //       CONSTANT.header.accessToken,
  //     //       generateAccessToken(admin._id, admin.role)
  //     //     )
  //     //     .json("Access token have refresh");
  //     // });
  //   }
  // }
}
