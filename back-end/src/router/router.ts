import express, { Router, Application } from "express";
import { DashboardRouter } from "./dashboard/dashboard-router";
import { BaseRouter } from "../base/router-base";

export class RouterClass extends BaseRouter {
  private dashboardRouter: DashboardRouter = new DashboardRouter();
  private dlientRouter: any;
  constructor() {
    super();
    this.routerDasboard();
  }
  routerDasboard() {
    this.router.use("/admin", this.dashboardRouter.router);
  }
}

// routerClient() {
//   this.router.use("/client", this.dlientRouter);
// }
