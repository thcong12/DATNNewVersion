import mongoose, { Schema, Model } from "mongoose";
import bcryptjs from "bcryptjs";
import { CONSTANT } from "../../constant";

export interface IAdmin {
  _id: Schema.Types.ObjectId;
  userName: string;
  fullName: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
  refreshToken: string;
  isActive: boolean;
}
const adminSchema = new Schema<IAdmin>(
  {
    userName: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
      default: "",
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: process.env.TYPE_ADMIN_2ST,
    },
    refreshToken: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.matchPassword = function (enterPassword: string) {
  return bcryptjs.compareSync(enterPassword, this.password);
};
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  }
});

export const AdminModel: Model<IAdmin> = new Model(
  CONSTANT.MODEL_NAME.admin,
  adminSchema
);
