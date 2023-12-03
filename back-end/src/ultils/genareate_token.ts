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

export const checkSection = (req: Request, res: Response) => {
  const authHeader = req.header(CONSTANT.header.accessToken);
  jwt.verify(authHeader!, CONSTANT.jwt.accessAdmin, (err, decoded: any) => {
    if (err) return res.sendStatus(401); //invalid token

    // req = decoded.id,
    // admin_value: decoded.value,
  });
};
export const checkUser = (res: Response, req: Request, next: NextFunction) => {
  const authHeader: any = req.header(CONSTANT.header.refreshToken);
  if (authHeader) {
    const decode = jwt.verify(authHeader, CONSTANT.jwt.secret) as MyToken;
    return decode;
  }
};
