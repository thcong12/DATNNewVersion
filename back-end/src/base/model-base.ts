import { Schema } from "mongoose";
import { IAdmin } from "../model/admin/AdminModel";

export abstract class ModelBase {
  public schema: Schema;
  constructor() {
    this.schema = new Schema();
  }
  public abstract preMiddleware(): void;
}
