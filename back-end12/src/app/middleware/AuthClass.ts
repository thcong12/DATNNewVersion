import jwt from "jsonwebtoken";
import { CONSTANT } from "../constant";
import { NextFunction, Request, Response } from "express";

export class Authentication {
  private request: Request;
  private response: Response;
  private next: NextFunction;
  private accessJwt: string;
  constructor(
    req: Request,
    res: Response,
    next: NextFunction,
    accessJwt: string
  ) {
    this.request = req;
    this.response = res;
    this.next = next;
    this.accessJwt = accessJwt;
  }

  getAccessToken() {
    return this.request.header(CONSTANT.header.refreshToken);
  }
  getRefreshToken() {
    return this.request.header(CONSTANT.header.accessToken);
  }
  generateAccessToken(id: string, authValue?: string) {
    return jwt.sign({ id, authValue }, this.accessJwt, {
      expiresIn: CONSTANT.expires_time,
    });
  }
  generateRefreshToken(id: string) {
    return jwt.sign({ id }, CONSTANT.jwt.secret, {
      expiresIn: CONSTANT.expires_time.refesh_time,
    });
  }
  decodeToken() {
    jwt.verify(
      this.getAccessToken(),
      this.accessJwt,
      function (err: any, decoded: any) {
        if (err) {
          return this.response.sendStatus(CONSTANT.code_status.OK);
        }
        this.request._id = decoded.id;
        this.request.authValue = decoded.authValue;
        this.next();
      }
    );
  }
}
