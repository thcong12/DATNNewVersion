import { Request, Response } from "express";
import { Model } from "mongoose";
import { AuthBaseController } from "../base/auth-controller-base";
import { CONSTANT } from "../constant";
import { IAdmin } from "../model/admin/AdminModel";
import {
  IUser,
  IUserMethods,
  IUserProfile,
  UserModel,
  UserProfileModel,
} from "../model/user/UserModel";
import { generateRefreshToken } from "../ultils/genareate_token";
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
    const userReq: IAdmin = req.body;
    const existUser = await this.getUserVar("userName", userReq.userName);
    console.log(existUser);
    if (!existUser) {
      const newUser = await this.model.create({
        ...userReq,
      });
      const profile = await this.UserProfile.create({
        fullName: userReq.fullName,
        userId: newUser._id,
      });
      const mailSubject: string = "Confirm Your Email";
      const mailText: string = "Hello world?";
      // const saveuser = await newUser.save();
      if (newUser) {
        const token = generateRefreshToken(String(newUser._id));
        const link = `http://localhost:${CONSTANT.port.clientFE}/auth/actice/${token}`;
        this.tranport.sendMail(
          this.mailOption(
            activeAccount(link, newUser.userName),
            newUser,
            mailSubject,
            mailText
          ),
          function (err) {
            if (err) {
              res.json("Please check your email");
            } else {
              res
                .json({
                  message: "Email has been sent--Please confirm",
                })
                .sendStatus(201);
            }
          }
        );
      }
    } else {
      res.sendStatus(409);
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
  // }
}
