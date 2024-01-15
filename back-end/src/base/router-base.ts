import express, { NextFunction, Request, Response } from "express";
import { CONSTANT } from "../constant";
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DataRecomendController } from "../controller/recommend-controller";
export interface MyToken extends JwtPayload {
  id?: string;
  value?: string;
}

export abstract class BaseRouter {
  public router: express.Router;
  protected accessDecode?: MyToken;
  protected refreshDecode?: MyToken;
  protected RecomendController: DataRecomendController =
    new DataRecomendController();
  constructor() {
    this.router = express.Router();
  }
  protected checkUser() {
    this.router.use(
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const authHeader: any = req.header(CONSTANT.header.refreshToken);
          if (authHeader) {
            return jwt.verify(
              authHeader,
              CONSTANT.jwt.secret,
              (err: any, decoded: any) => {
                if (err) return res.sendStatus(401); //invalid token
                this.accessDecode = decoded;
                next();
              }
            );
          }
        }
      )
    );
  }
  protected checkSection() {
    this.router.use(
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const authHeader: any = req.header(CONSTANT.header.accessToken);
          if (authHeader) {
            return jwt.verify(
              authHeader,
              CONSTANT.jwt.accessAdmin,
              (err: any, decoded: any) => {
                if (err) return res.sendStatus(403); //invalid token
                this.refreshDecode = decoded;
                next();
              }
            );
          }
        }
      )
    );
  }
}
