import mongoose, { Schema, Model } from "mongoose";
import bcryptjs from "bcryptjs";
import { CONSTANT } from "../../constant";
import { ModelBase } from "../../base/model-base";
import { IAuthBase } from "../base/auth";

export interface IAdmin extends IAuthBase {
  fullName?: string;
  phoneNumber?: string;
  role: string;
}

export interface IAdminrMethods {
  matchPassword(password: string): string;
}

// Create a new Model type that knows about IUserMethods...
type AdminModel = Model<IAdmin, {}, IAdminrMethods>;

const adminSchema = new Schema<IAdmin, AdminModel, IAdminrMethods>(
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
    section: {
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
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  }
});

adminSchema.method(
  "matchPassword",
  function matchPassword(enterPassword: string) {
    return bcryptjs.compareSync(enterPassword, this.password);
  }
);

export const AdminModel: AdminModel = mongoose.model<IAdmin, AdminModel>(
  CONSTANT.MODEL_NAME.admin,
  adminSchema
);
