import express from "express";
import { CONSTANT } from "../constant";

export abstract class BaseRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
  }
}
