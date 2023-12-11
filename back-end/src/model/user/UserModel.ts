import mongoose, { Schema, Model, Types } from "mongoose";
import bcryptjs from "bcryptjs";
import { CONSTANT } from "../../constant";
import { IAuthBase } from "../base/auth";

export interface IUser extends IAuthBase {
  firstName?: string;
  lastName: string;
  phoneNumber?: string;
}

export interface IUserProfile {
  userId: Schema.Types.ObjectId;
  fullName: String;
  avatar: String;
  decription: String;
  address: String[];
}

export interface IUserMethods {
  matchPassword(password: string): string;
}

interface IProfileMethods {}

// Create a new Model type that knows about IUserMethods...
type IUserModel = Model<IUser, {}, IUserMethods>;
type IProfileModel = Model<IUserProfile, {}, IProfileMethods>;
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

const UserProfile = new Schema<IUserProfile, IProfileMethods, IProfileModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    fullName: {
      type: String,
      require: true,
      default: "",
    },
    avatar: {
      type: String,
      require: false,
      default: "",
    },
    decription: {
      type: String,
      require: true,
      default: "",
    },
    address: [
      {
        type: String,
        require: true,
        default: "",
      },
    ],
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

export const UserProfileModel: IProfileModel = mongoose.model<
  IUserProfile,
  IProfileModel
>(CONSTANT.MODEL_NAME.profile, UserProfile);
