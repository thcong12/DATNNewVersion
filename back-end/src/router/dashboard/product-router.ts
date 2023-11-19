import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";

import { IDeveloper } from "../../model/product/DeveloperModel";
import { DeveloperController } from "../../controller/developer-controller";
import { ProductController } from "../../controller/product-controller";
import { IProduct } from "../../model/product/ProductModel";

export class ProductRouter extends BaseRouter {
  private product: ProductController = new ProductController();
  constructor() {
    super();
    this.getDetail();
    this.getAll();
    this.modifyDetail();
    this.createNew();
  }
  getAll() {
    this.router.get(
      "",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.product.getAllproduct();
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
          const data = await this.product.getProductDetail(id);
          res.json(data);
        }
      )
    );
  }
  modifyDetail() {
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
}
