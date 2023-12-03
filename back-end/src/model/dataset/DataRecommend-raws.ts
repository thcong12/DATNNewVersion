import mongoose, { Model, Number, Schema, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IDataRecomendRaw {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  click: Number;
}

const DataRecomendRawSchema = new Schema<IDataRecomendRaw>(
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
  },
  {
    timestamps: true,
  }
);
export const DataRecomendModelRaw: Model<IDataRecomendRaw> =
  mongoose.model<IDataRecomendRaw>(
    CONSTANT.MODEL_NAME.dataRecomendraw,
    DataRecomendRawSchema
  );
