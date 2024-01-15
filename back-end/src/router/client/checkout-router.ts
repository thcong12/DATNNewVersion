import expressAsyncHandler from "express-async-handler";
import { BaseRouter } from "../../base/router-base";
import { CheckOutController } from "../../controller/checkout-controller";
import { NextFunction, Response, Request } from "express";
import { checkSection } from "../../ultils/genareate_token";

export class CheckoutRouter extends BaseRouter {
  private OrderController: CheckOutController = new CheckOutController();
  constructor() {
    super();
    this.createNewOrder();
    this.payOrer();
  }
  createNewOrder() {
    this.router.post(
      "/order",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const user = checkSection(req, res);
          const data = await this.OrderController.checkOut(user, req, res);
          res.json(data);
        }
      )
    );
  }
  payOrer() {
    this.router.put(
      "/order/pay",
      expressAsyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
          const user = checkSection(req, res);
          const orderId = req.body;
          const data = await this.OrderController.payOrder(orderId, user, res);
          console.log(data);
          await this.RecomendController.updateData(user.id, "buy", data);
          res.json(data);
        }
      )
    );
  }
}
