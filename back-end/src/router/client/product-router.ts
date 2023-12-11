import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { ProductController } from "../../controller/product-controller";
import { NextFunction, Request, Response } from "express";
import { HomePageController } from "../../controller/home-page-controller";

export class ProductRouter extends BaseRouter {
  private Product: ProductController = new ProductController();
  private HomePage: HomePageController = new HomePageController();
  constructor() {
    super();
    this.importRouter();
  }
  importRouter() {
    this.getAll();
    this.getProductHomeSlide();
    this.getProductBestSeller();
    this.getProductNewRelease();
    this.getProductSale();
    this.getProductDetail();
  }
  getAll() {
    this.router.get(
      "",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.Product.getAllproduct(200);
          res.json(data);
        }
      )
    );
  }
  getProductDetail() {
    this.router.get(
      "/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const productId = req.params.id;
          const productInfo = await this.Product.getProductDetail(productId);
          const productDetail = await this.HomePage.getProductDetail(productId);
          if (productInfo && productDetail) {
            res.json({
              product: productInfo,
              productDetail: productDetail,
            });
          } else {
            res.sendStatus(404);
          }
        }
      )
    );
  }
  getProductBestSeller() {
    this.router.get(
      "/bestseller",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const bestseller = await this.HomePage.getBestSeller();
          res.json(bestseller);
        }
      )
    );
  }
  getProductNewRelease() {
    this.router.get(
      "/release",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const newrelease = await this.HomePage.getProductNewRelease();
          res.json(newrelease);
        }
      )
    );
  }
  getProductHomeSlide() {
    this.router.get(
      "/slide",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.HomePage.getProductSlide();
          res.json(data);
        }
      )
    );
  }
  getProductSale() {
    this.router.get(
      "/sale",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.HomePage.getProductSale();
          res.json(data);
        }
      )
    );
  }
}
