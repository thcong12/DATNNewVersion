import jwt, { JwtPayload } from "jsonwebtoken";
import { CONSTANT } from "../constant";
import { NextFunction, Request, Response } from "express";

export interface MyToken extends JwtPayload {
  id?: string;
  value?: string;
}

export const generateAccessToken = (id: any, value: any) => {
  const payload: MyToken = { id: id, value: value };
  return jwt.sign(payload, CONSTANT.jwt.accessAdmin, {
    expiresIn: "1h",
  });
};
export const generateUserAccessToken = (id: any, value: any) => {
  const payload: MyToken = { id: id, value: value };
  return jwt.sign(payload, CONSTANT.jwt.accessUser, {
    expiresIn: "1h",
  });
};
export const generateRefreshToken = (id: string) => {
  const payload: MyToken = { id: id };
  return jwt.sign(payload, CONSTANT.jwt.secret, {
    expiresIn: "7d",
  });
};
// const token = jwt.sign(
//   { _id: foundUser._id?.toString(), name: foundUser.name },
//   SECRET_KEY,
//   {
//     expiresIn: "2 days",
//   }
// );

export const checkSection: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: any = req.header(CONSTANT.header.accessToken);
  if (authHeader) {
    return jwt.verify(
      authHeader,
      CONSTANT.jwt.accessAdmin,
      (err: any, decoded: any) => {
        if (err) return res.sendStatus(403); //invalid token
        return decoded;
      }
    );
  }
};

export const checkUser: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req);
  const authHeader: any = req.header(CONSTANT.header.refreshToken);
  if (authHeader) {
    return jwt.verify(
      authHeader,
      CONSTANT.jwt.secret,
      (err: any, decoded: any) => {
        if (err) return res.sendStatus(401); //invalid token
        return decoded;
      }
    );
  }
};
