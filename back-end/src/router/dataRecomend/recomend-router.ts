import express, {
  Router,
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import { BaseRouter, MyToken } from "../../base/router-base";
// import { DataRecomendController } from "../../controller/dataRecommed";
import expressAsyncHandler from "express-async-handler";
import { DataRecomendController } from "../../controller/recommend-controller";
import { checkSection, checkUser } from "../../ultils/genareate_token";
import { SetDataController } from "../../controller/dataRecommed";
import { cityData } from "../../data/city";
import { IDataRecomend } from "../../model/dataset/DataRecomend";

export class RecommendRouter extends BaseRouter {}
