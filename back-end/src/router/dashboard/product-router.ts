import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";

import { IDeveloper } from "../../model/product/DeveloperModel";
import { DeveloperController } from "../../controller/developer-controller";
import { ProductController } from "../../controller/product-controller";
import { IProduct } from "../../model/product/ProductModel";
import { HomePageController } from "../../controller/home-page-controller";

export class ProductRouter extends BaseRouter {
  private product: ProductController = new ProductController();
  private homePage: HomePageController = new HomePageController();
  constructor() {
    super();
    this.getAll();
    this.bestSale();
    this.onSale();
    this.modifyProductDetail();
    this.modifyProduct();
    this.createNew();
    this.getDetail();
  }
  getAll() {
    this.router.get(
      "",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.product.getAllproductForDashboard(200);
          res.json(data);
        }
      )
    );
  }
  getDetail() {
    this.router.get(
      "/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const id = req.params.id;
          const data = await this.product.getDetailProduct(id);
          res.json(data);
        }
      )
    );
  }
  modifyProduct() {
    this.router.put(
      "/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const cateId = req.params.id;
          const data = await this.product.modifyProduct(cateId, req);
          res.json(data);
        }
      )
    );
  }
  modifyProductDetail() {
    this.router.put(
      "/detail/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const cateId = req.params.id;
          const data = await this.product.modifyDetailProduct(cateId, req);
          res.json(data);
        }
      )
    );
  }
  createNew() {
    this.router.post(
      "/",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.product.createProudct(req);
          res.json(data);
        }
      )
    );
  }
  bestSale() {
    this.router.get(
      "/bestsale",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.homePage.getBestSeller();
          res.json(data);
        }
      )
    );
  }
  onSale() {
    this.router.get(
      "/onsale",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.homePage.getProductSale();
          res.json(data);
        }
      )
    );
  }
}
