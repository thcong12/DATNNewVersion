import express, {
  Router,
  Application,
  Response,
  Request,
  NextFunction,
} from "express";
import { DashboardRouter } from "./dashboard/dashboard-router";
import { BaseRouter } from "../base/router-base";
import { ClientRouter } from "./client/client-router";
import { RecommendRouter } from "./dataRecomend/recomend-router";

export class RouterClass extends BaseRouter {
  private dashboardRouter: DashboardRouter = new DashboardRouter();
  private clientRouter: ClientRouter = new ClientRouter();

  constructor() {
    super();
    this.routerDasboard();
    this.routerClient();
  }
  routerDasboard() {
    this.router.use("/admin", this.dashboardRouter.router);
  }
  routerClient() {
    this.router.use("/client", this.clientRouter.router);
  }
}
