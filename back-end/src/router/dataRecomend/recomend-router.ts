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
          const updateDatabase = await this.DataRaw.pearson_correlation(
            "63847b8176c5783ec79ef234",
            "63847cf776c5783ec79ef473",
            "click"
          );
          console.log(updateDatabase);
          res.json(updateDatabase);
        }
      )
    );
  }
}
