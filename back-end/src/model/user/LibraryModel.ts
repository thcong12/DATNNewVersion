import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IUserProduct {
  product: Types.ObjectId;
  orderId: Types.ObjectId;
}
export interface ILibraly {
  userId: Types.ObjectId;
  userProduct: IUserProduct[];
}

const libralySchema = new Schema<ILibraly>(
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

export const LibralyModel: Model<ILibraly> = mongoose.model(
  "libraries",
  libralySchema
);
