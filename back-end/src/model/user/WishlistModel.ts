import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IUserProduct {
  product: Types.ObjectId;
}
export interface IWishList {
  userId: Types.ObjectId;
  userWishlist: IUserProduct[];
}

const wishListSchema: Schema<IWishList> = new Schema<IWishList>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    userWishlist: [
      {
        product: {
          type: Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
      { _id: false },
    ],
  },
  { timestamps: true }
);

export const WishListModel: Model<IWishList> = mongoose.model(
  CONSTANT.MODEL_NAME.wishList,
  wishListSchema
);
