import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { IDeveloper } from "../../model/product/DeveloperModel";
import { DeveloperController } from "../../controller/developer-controller";

export class DeveloperRouter extends BaseRouter {
  private Controller: DeveloperController = new DeveloperController();
  constructor() {
    super();
    this.getDetail();
    this.getAll();
    this.modifyDetail();
    this.createNew();
  }
  getAll() {
    this.router.get(
      "/",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const data = await this.Controller.getAllData();
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
          const cateId = req.params.id;
          const data = await this.Controller.getDetailById(cateId);
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
          const dataReq: IDeveloper = req.body;
          const cateId = req.params.id;
          const data = await this.Controller.putData(cateId, dataReq);
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
          const dataReq: IDeveloper = req.body;
          const key: keyof IDeveloper = "devName";
          const data = await this.Controller.postData(dataReq, key);
          res.json(data);
        }
      )
    );
  }
}
