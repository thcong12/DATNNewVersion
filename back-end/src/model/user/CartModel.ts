import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IUserProduct {
  product: Types.ObjectId;
  orderId: Types.ObjectId;
}
export interface ICart {
  userId: Types.ObjectId;
  userProduct: IUserProduct[];
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    userProduct: [
      {
        product: {
          type: Types.ObjectId,
          require: true,
          ref: "Product",
        },
        orderId: {
          type: Types.ObjectId,
          require: true,
          ref: "Order",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CartModel: Model<ICart> = mongoose.model(
  CONSTANT.MODEL_NAME.cart,
  cartSchema
);
