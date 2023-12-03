import express, { Request } from "express";
import { CONSTANT } from "../constant";

export abstract class BaseRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
  }
  protected userByToken(req: Request) {
    // const g
    return;
  }
}
