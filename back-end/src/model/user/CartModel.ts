import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IUserProduct {
  product: Types.ObjectId;
  quantity: number;
}
export interface ICart {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  cartDetail: IUserProduct[];
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    cartDetail: [
      {
        product: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
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
