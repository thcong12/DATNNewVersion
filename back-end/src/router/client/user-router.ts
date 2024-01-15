import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { UserControllerBase } from "../../base/user-controller-base";
import { ProductController } from "../../controller/product-controller";
import { CartModel, ICart } from "../../model/user/CartModel";
import { ILibraly, LibralyModel } from "../../model/user/LibraryModel";
import { IWishList, WishListModel } from "../../model/user/WishlistModel";
import { MyToken, checkSection } from "../../ultils/genareate_token";

export class UserRouter extends BaseRouter {
  private CartController: UserControllerBase<ICart> =
    new UserControllerBase<ICart>(CartModel);
  private WishListController: UserControllerBase<IWishList> =
    new UserControllerBase<IWishList>(WishListModel);
  private LibralyController: UserControllerBase<ILibraly> =
    new UserControllerBase<ILibraly>(LibralyModel);
  private ProductController: ProductController = new ProductController();
  constructor() {
    super();
    // this.checkSection();
    this.addCartItem();
    this.removeCartItem();
    this.getCart();
    this.getWishlist();
    this.addWishlistItem();
    this.removeWishlistItem();
    this.getLibrary();
    this.getDataRecomend();
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
          const user: MyToken = checkSection(req, res, next);
          const dataReq: any = req.body;
          await this.RecomendController.updateData(
            user.id!,
            "cart",
            dataReq._id
          );
          const data = await this.CartController.addEvent(
            user,
            "cartDetail",
            dataReq,
            res
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
          const user: MyToken = checkSection(req, res, next);
          const dataReq: any = req.body;
          await this.RecomendController.updateData(
            user.id!,
            "wishlist",
            dataReq._id
          );
          const data = await this.WishListController.addEvent(
            user,
            "userWishlist",
            dataReq,
            res
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
  getDataRecomend() {
    this.router.get(
      "/recomend",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const userId: MyToken = checkSection(req, res, next);
          if (userId.id) {
            const allData = await this.RecomendController.recommendation_eng(
              userId.id,
              "productId"
            );
            const returnData: any[] = await this.RecomendController.checkIsBuy(
              allData,
              userId.id
            );

            const products = await this.ProductController.getProduct(
              returnData.splice(0,10)
            );
            const productDetail =
              await this.ProductController.getDetailInformation(
                products,
                "_id"
              );
            const dataFinal = this.ProductController.dataReturn(
              products,
              productDetail
            );
            res.json(dataFinal);
          }
        }
      )
    );
  }
}
