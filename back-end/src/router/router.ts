import express, { Router, Application } from "express";
import { DashboardRouter } from "./dashboard/dashboard-router";
import { BaseRouter } from "../base/router-base";
import { ClientRouter } from "./client/client-router";
import { RecommendRouter } from "./dataRecomend/recomend-router";

export class RouterClass extends BaseRouter {
  private dashboardRouter: DashboardRouter = new DashboardRouter();
  private clientRouter: ClientRouter = new ClientRouter();
  private recomendRouter: RecommendRouter = new RecommendRouter();
  constructor() {
    super();
    this.routerDasboard();
    this.routerClient();
    this.routerRecomend();
  }
  routerDasboard() {
    this.router.use("/admin", this.dashboardRouter.router);
  }
  routerClient() {
    this.router.use("/client", this.clientRouter.router);
  }
  routerRecomend() {
    this.router.use("/recomend", this.recomendRouter.router);
  }
}
