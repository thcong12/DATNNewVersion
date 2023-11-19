import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";

import { ICateglory } from "../../model/product/CategloryModel";
import { CategloryController } from "../../controller/category-controller";

export class CategoryRouter extends BaseRouter {
  private Category: CategloryController = new CategloryController();
  constructor() {
    super();
    this.getDetailCategory();
    this.getAllCategory();
    this.modifyDetailCategory();
    this.createNewCategory();
  }
  getAllCategory() {
    this.router.get(
      "/",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.Category.getAllData();
          res.json(data);
        }
      )
    );
  }
  getDetailCategory() {
    this.router.get(
      "/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const cateId = req.params.id;
          const data = await this.Category.getDetailById(cateId);
          res.json(data);
        }
      )
    );
  }
  modifyDetailCategory() {
    this.router.put(
      "/:id",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const dataReq: ICateglory = req.body;
          const cateId = req.params.id;
          const data = await this.Category.putData(cateId, dataReq);
          res.json(data);
        }
      )
    );
  }
  createNewCategory() {
    this.router.post(
      "/",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const dataReq: ICateglory = req.body;
          const key: keyof ICateglory = "cateName";
          const data = await this.Category.postData(dataReq, key);
          res.json(data);
        }
      )
    );
  }
}
