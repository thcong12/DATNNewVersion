import mongoose, { Schema, Model, Types } from "mongoose";
import { CONSTANT } from "../../constant";

export interface IDeveloper {
  _id: Schema.Types.ObjectId;
  devName: string;
  devAvatar: string;
  devLinkSocialMedia: Types.Array<string>;
  description: string;
}

const developerSchema = new Schema<IDeveloper>({
  devName: {
    type: String,
    require: true,
    default: "",
  },
  devAvatar: {
    type: String,
    require: true,
    default: "",
  },
  devLinkSocialMedia: [
    {
      type: String,
      require: false,
      default: "",
    },
  ],
  description: {
    type: String,
    require: true,
    default: "",
  },
});

export const DeveloperModel: Model<IDeveloper> = mongoose.model(
  CONSTANT.MODEL_NAME.developer,
  developerSchema
);
