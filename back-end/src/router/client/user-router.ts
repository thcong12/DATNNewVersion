import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { DashboardAuthController } from "../../controller/auth-admin-controller";
import { AdminController } from "../../controller/admin-controller";
import { ClientAuthController } from "../../controller/auth-user-controller";
import { UserController } from "../../controller/user-controller";
import { checkSection, checkUser } from "../../ultils/genareate_token";
import { CONSTANT } from "../../constant";
import { IWishList, WishListModel } from "../../model/user/WishlistModel";
import { CartModel, ICart } from "../../model/user/CartModel";
import { UserControllerBase } from "../../base/user-controller-base";
import { ILibraly, LibralyModel } from "../../model/user/LibraryModel";

export class UserRouter extends BaseRouter {
  private CartController: UserControllerBase<ICart> =
    new UserControllerBase<ICart>(CartModel);
  private WishListController: UserControllerBase<IWishList> =
    new UserControllerBase<IWishList>(WishListModel);
  private LibralyController: UserControllerBase<ILibraly> =
    new UserControllerBase<ILibraly>(LibralyModel);
  constructor() {
    super();
    this.checkSection();
    this.addCartItem();
    this.removeCartItem();
    this.getCart();
    this.getWishlist();
    this.addWishlistItem();
    this.removeWishlistItem();
    this.getLibrary();
  }
  getCart() {
    this.router.get(
      "/cart",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const userId: any = checkSection(req, res, next);
          console.log(userId);
          const localKey: string = "cartDetail.product";
          const saveAs: string = "cartDetail";
          if (userId) {
            const data = await this.CartController.getDetail(
              userId.id,
              localKey,
              saveAs
            );
            if (data) {
              res.json(data.cartDetail);
            } else {
              res.json([]);
            }
          }
        }
      )
    );
  }
  addCartItem() {
    this.router.post(
      "/cart/add",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.CartController.addEvent(
            req,
            res,
            next,
            "cartDetail"
          );
          res.json(data);
        }
      )
    );
  }
  removeCartItem() {
    this.router.post(
      "/cart/remove",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.CartController.eventRemove(
            req,
            res,
            next,
            "cartDetail"
          );
          res.json(data);
        }
      )
    );
  }
  getWishlist() {
    this.router.get(
      "/wishlist",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const userId: any = checkSection(req, res, next);
          const localKey: string = "userWishlist.product";
          const saveAs: string = "userWishlist";
          if (userId) {
            const data = await this.WishListController.getDetail(
              userId.id!,
              localKey,
              saveAs
            );
            if (data) {
              res.json(data.userWishlist);
            } else {
              res.json([]);
            }
          }
        }
      )
    );
  }
  addWishlistItem() {
    this.router.post(
      "/wishlist/add",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.WishListController.addEvent(
            req,
            res,
            next,
            "userWishlist"
          );
          res.json(data);
        }
      )
    );
  }
  removeWishlistItem() {
    this.router.post(
      "/wishlist/remove",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.WishListController.eventRemove(
            req,
            res,
            next,
            "userWishlist"
          );
          res.json(data);
        }
      )
    );
  }
  getLibrary() {
    this.router.get(
      "/library",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const userId: any = checkSection(req, res, next);
          const localKey: string = "userProduct.product";
          const saveAs: string = "userProduct";
          if (userId) {
            const data = await this.LibralyController.getDetail(
              userId.id!,
              localKey,
              saveAs
            );
            if (data) {
              res.json(data.userProduct);
            } else {
              res.json([]);
            }
          }
        }
      )
    );
  }
}
