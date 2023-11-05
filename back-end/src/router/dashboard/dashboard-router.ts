import express, { Router, Application } from "express";
import { CategoryRouter } from "./category-router";
import { BaseRouter } from "../../base/router-base";
import { DeveloperRouter } from "./developer-router";
import { DashboardAuthRouter } from "./auth-router";

export class DashboardRouter extends BaseRouter {
  private category: CategoryRouter = new CategoryRouter();
  private developer: DeveloperRouter = new DeveloperRouter();
  private authentication: DashboardAuthRouter = new DashboardAuthRouter();
  constructor() {
    super();
    this.categoryRouter();
    this.developerRouter();
    this.authRouter();
  }
  categoryRouter() {
    this.router.use("/category", this.category.router);
  }
  developerRouter() {
    this.router.use("/developer", this.developer.router);
  }
  productRouter() {}

  authRouter() {
    this.router.use("/auth", this.authentication.router);
  }
}
