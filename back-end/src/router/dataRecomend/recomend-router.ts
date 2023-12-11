import express, {
  Router,
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import { BaseRouter } from "../../base/router-base";
// import { DataRecomendController } from "../../controller/dataRecommed";
import expressAsyncHandler from "express-async-handler";
import { DataRecomendController } from "../../controller/recommend-controller";
import { checkUser } from "../../ultils/genareate_token";

export class RecommendRouter extends BaseRouter {
  private DataRaw: DataRecomendController = new DataRecomendController();
  constructor() {
    super();
    this.getDataRaw();
  }
  getDataRaw() {
    this.router.get(
      "/",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          // const userId = checkUser(res, req, next);
          const updateDatabase = await this.DataRaw.recommendation_eng(
            "63847b8176c5783ec79ef234",
            "click"
          );
          res.json(updateDatabase);
        }
      )
    );
  }
}
