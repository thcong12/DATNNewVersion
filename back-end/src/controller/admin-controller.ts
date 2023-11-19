import { ControllerBase } from "../base/controller-base";
import { AdminModel, IAdmin } from "../model/admin/AdminModel";

export class AdminController extends ControllerBase<IAdmin> {
  constructor() {
    super(AdminModel);
  }
}
