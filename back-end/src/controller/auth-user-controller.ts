import { AuthBaseController } from "../base/auth-controller-base";
import { CONSTANT } from "../constant";
import { AdminModel, IAdmin, IAdminrMethods } from "../model/admin/AdminModel";
import { checkUser } from "../ultils/genareate_token";
import { NextFunction, Request, Response } from "express";
export class DashboardAuthController extends AuthBaseController<
  IAdmin,
  IAdminrMethods
> {
  constructor() {
    super(AdminModel);
  }

  // async login(req: Request, res: Response) {
  //   const userReq: IAdmin = req.body; //?
  //   // const admin1 = await this.getDetailByVar('userName',userReq.userName);
  //   const admin = await this.AdminM.findOne({ userName: userReq.userName }); //?
  //   if (admin && admin.matchPassword(userReq.password)) {
  //     this.processAfterLogin(req, res, async (token: any) => {
  //       admin.refreshToken = token;
  //       await admin.save();
  //     });
  //   } else {
  //     res.status(401);
  //     throw new Error("Some thing wrong please check user name or password");
  //   }
  // }
  // async logOut(req: Request, res: Response, next: NextFunction) {
  //   const authHeader: any = req.header(CONSTANT.header.refreshToken);
  //   checkUser(res, authHeader, next);
  //   const { id, value } = res as any;
  //   // if (authHeader) {
  //   //   jwt.verify(authHeader, "congdeptrai", (err, decoded: any) => {
  //   //     if (err) return res.sendStatus(401);
  //   //     // const { id, value } = decoded as any;
  //   //     console.log(decoded.id);
  //   //   });
  //   //   next();
  //   // }
  //   // const user = await this.getUserById(userId);
  //   // if (Array.isArray(user.section)) {
  //   //   //
  //   // } else {
  //   //   user.section = "";
  //   // }
  //   // await user.save();
  //   console.log(id);
  //   // res.json({ user: id }).sendStatus(204);
  // }

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
