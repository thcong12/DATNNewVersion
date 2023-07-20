import express, { Router, Application } from "express";
import { CategoryRouter } from "./category-router";
import { BaseRouter } from "../../base/router-base";
import { DeveloperRouter } from "./developer-router";

export class DashboardRouter extends BaseRouter {
  private category: CategoryRouter = new CategoryRouter();
  private developer: DeveloperRouter = new DeveloperRouter();
  constructor() {
    super();
    this.categoryRouter();
    this.developerRouter();
  }
  categoryRouter() {
    this.router.use("/category", this.category.router);
  }
  developerRouter() {
    this.router.use("/developer", this.developer.router);
  }
  productRouter() {}
}
