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
import { SetDataController } from "../../controller/dataRecommed";
import { cityData } from "../../data/city";
import { IDataRecomend } from "../../model/dataset/DataRecomend";

export class RecommendRouter extends BaseRouter {
  private DataRaw: DataRecomendController = new DataRecomendController();
  private SetData: SetDataController = new SetDataController();
  constructor() {
    super();
    this.getDataRaw();
    this.setData();
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
  setData() {
    this.router.get(
      "/data",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const allData = await this.SetData.getDataRecomend();
          let data: IDataRecomend[] = [];
          for (let i = 0; i < allData.length; i++) {
            const dataItem = await this.SetData.findUserData(allData[i]);
            data.push(dataItem);
          }
          // const result = allData.map((item) => {
          //   return item;
          //   // return await this.SetData.findUserData(item);
          // });
          res.json(data);
        }
      )
    );
  }
}
