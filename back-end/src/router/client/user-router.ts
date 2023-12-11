import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { DashboardAuthController } from "../../controller/auth-admin-controller";
import { AdminController } from "../../controller/admin-controller";
import { ClientAuthController } from "../../controller/auth-user-controller";
import { UserController } from "../../controller/user-controller";
import { checkSection, checkUser } from "../../ultils/genareate_token";

export class UserRouter extends BaseRouter {
  private UserController = new UserController();
  constructor() {
    super();
    this.addItem();
    this.removeItem();
    this.getCart();
  }
  addItem() {
    this.router.post(
      "/add",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.UserController.addToCart(req, res);
          res.json(data);
        }
      )
    );
  }
  removeItem() {
    this.router.post(
      "/remove",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.UserController.removeUserCart(req, res);
          res.json(data);
        }
      )
    );
  }
  getCart() {
    this.router.get(
      "/cart/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const userId = req.params.id;
          const data = await this.UserController.getUserCart(userId);
          if (data) {
            res.json(data);
          }
        }
      )
    );
  }
}
