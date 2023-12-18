import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { DashboardAuthController } from "../../controller/auth-admin-controller";
import { AdminController } from "../../controller/admin-controller";
import { ClientAuthController } from "../../controller/auth-user-controller";

export class ClientAuthRouter extends BaseRouter {
  private UserController = new ClientAuthController();
  constructor() {
    super();
    this.signIn();
    this.login();
    this.logout();
    this.refreshToken();
  }
  login() {
    this.router.post(
      "/login",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.UserController.login(req, res);
          res.json(data);
        }
      )
    );
  }
  signIn() {
    this.router.post(
      "/signin",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.UserController.signin(req, res);
          res.json(data);
        }
      )
    );
  }
  logout() {
    this.router.get(
      "/logout",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          await this.UserController.logout(req, res, next, "section");
        }
      )
    );
  }
  refreshToken() {
    this.router.get(
      "/refresh",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          await this.UserController.refreshToken(req, res, next);
          res.status(201);
        }
      )
    );
  }
}
