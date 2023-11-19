import mongoose, { Schema, Model, Types } from "mongoose";
import bcryptjs from "bcryptjs";
import { CONSTANT } from "../../constant";
import { IAuthBase } from "../base/auth";

export interface IUser extends IAuthBase {
  firstName?: string;
  lastName: string;
  phoneNumber?: string;
}

export interface IUserMethods {
  matchPassword(password: string): string;
}

// Create a new Model type that knows about IUserMethods...
type IUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    userName: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
    section: [
      {
        type: String,
        require: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  }
});

userSchema.method(
  "matchPassword",
  function matchPassword(enterPassword: string) {
    return bcryptjs.compareSync(enterPassword, this.password);
  }
);

export const UserModel: IUserModel = mongoose.model<IUser, IUserModel>(
  CONSTANT.MODEL_NAME.user,
  userSchema
);
