import express, { Router, Application } from "express";
import { CategoryRouter } from "./category-router";
import { BaseRouter } from "../../base/router-base";
import { DeveloperRouter } from "./developer-router";
import { ClientAuthRouter } from "./auth-router";
import { ProductRouter } from "./product-router";

export class ClientRouter extends BaseRouter {
  private category: CategoryRouter = new CategoryRouter();
  private developer: DeveloperRouter = new DeveloperRouter();
  private authentication: ClientAuthRouter = new ClientAuthRouter();
  private product: ProductRouter = new ProductRouter();
  constructor() {
    super();
    this.categoryRouter();
    this.developerRouter();
    this.authRouter();
    this.productRouter();
  }
  categoryRouter() {
    this.router.use("/category", this.category.router);
  }
  developerRouter() {
    this.router.use("/developer", this.developer.router);
  }
  productRouter() {
    this.router.use("/product", this.product.router);
  }
  authRouter() {
    this.router.use("/auth", this.authentication.router);
  }
}
