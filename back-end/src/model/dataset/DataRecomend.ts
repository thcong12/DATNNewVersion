import mongoose, { Model, Schema, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IDataRecomend {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  product: IData[];
}
interface IData {
  productId: Types.ObjectId;
  click: number;
}
const DataRecomendSchema = new Schema<IDataRecomend>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: [
      {
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
    ],
  },
  {
    timestamps: true,
  }
);
export const DataRecomendModel: Model<IDataRecomend> =
  mongoose.model<IDataRecomend>(
    CONSTANT.MODEL_NAME.dataRecomend,
    DataRecomendSchema
  );
