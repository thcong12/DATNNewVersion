import { ControllerBase } from "../base/controller-base";
import { CategloryModel, ICateglory } from "../model/product/CategloryModel";

export class CategloryController extends ControllerBase<ICateglory> {
  constructor() {
    super(CategloryModel);
  }
}
