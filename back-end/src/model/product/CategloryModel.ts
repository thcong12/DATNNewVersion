import mongoose, { Schema, Model } from "mongoose";
import { CONSTANT } from "../../constant";

export interface ICateglory {
  _id: Schema.Types.ObjectId;
  cateName: string;
  description: string;
}

const categlorySchema = new Schema<ICateglory>({
  cateName: {
    type: String,
    require: true,
    default: "",
  },
  description: {
    type: String,
    require: true,
    default: "",
  },
});
export const CategloryModel: Model<ICateglory> = mongoose.model(
  CONSTANT.MODEL_NAME.category,
  categlorySchema
);
