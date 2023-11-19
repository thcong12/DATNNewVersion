import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IHomeSlide {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  description: string;
  isActive: Boolean;
}

const homeSlideSchema = new Schema<IHomeSlide>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const HomeSlideModel: Model<IHomeSlide> = mongoose.model(
  CONSTANT.MODEL_NAME.homeSlide,
  homeSlideSchema
);
