import mongoose, { Model, Number, Schema, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IDataRecomendNew {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  click: number;
  cart: number;
  buy: number;
  wishlist: number;
}
interface IValue {
  key: Types.ObjectId;
  value: number;
}
export interface IUserProductsRecomend {
  userId: Types.ObjectId;
  products: IValue[];
}

const DataRecomendNewSchema = new Schema<IDataRecomendNew>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    click: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Number,
      default: 0,
    },
    buy: {
      type: Number,
      default: 0,
    },
    wishlist: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const UserProductsRecomendSchema = new Schema<IUserProductsRecomend>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      key: {
        type: String,
        default: "",
      },
      value: {
        type: Number,
        default: 0,
      },
    },
    {
      _id: false,
    },
  ],
});
export const DataRecomendNewModel: Model<IDataRecomendNew> =
  mongoose.model<IDataRecomendNew>(
    CONSTANT.MODEL_NAME.dataRecomendNew,
    DataRecomendNewSchema
  );
export const UserDataRecomendModel: Model<IUserProductsRecomend> =
  mongoose.model<IUserProductsRecomend>(
    CONSTANT.MODEL_NAME.productsRecomend,
    UserProductsRecomendSchema
  );
