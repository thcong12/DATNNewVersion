import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface ICity {
  name: string;
  code: string;
}

const citySchema: Schema<ICity> = new Schema<ICity>(
  {
    name: {
      type: String,
      require: true,
      default: "",
    },
    code: {
      type: String,
      require: true,
      default: "",
    },
  },
  { timestamps: false }
);

export const CityModel: Model<ICity> = mongoose.model(
  CONSTANT.MODEL_NAME.city,
  citySchema
);
