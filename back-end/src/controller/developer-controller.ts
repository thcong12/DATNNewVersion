import { Request } from "express";
import { DeveloperModel, IDeveloper } from "../model/product/DeveloperModel";
import { ControllerBase } from "../base/controller-base";

export class DeveloperController extends ControllerBase<IDeveloper> {
  constructor() {
    super(DeveloperModel);
  }
}
