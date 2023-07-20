import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IWishList {
  userId: Types.ObjectId;
  productId: Types.DocumentArray<Types.ObjectId>;
}

const wishListSchema: Schema<IWishList> = new Schema<IWishList>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    productId: [
      {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Product",
      },
    ],
  },
  { _id: false, timestamps: true }
);

export const WishListModel: Model<IWishList> = new Model(
  CONSTANT.MODEL_NAME.wishList,
  wishListSchema
);
