import { NextFunction } from "express";
import { Model, Schema } from "mongoose";
import { OptionMiddleware } from "../constant/enum";

export class ModelBase extends Model {
  private schema: Schema;
  static greet() {
    console.log("Hello, pre middleware!");
  }

  constructor(schema: Schema) {
    super();
    this.schema = schema;
  }
}
