import mongoose, { Schema, Model, Types } from "mongoose";
import bcryptjs from "bcryptjs";
import { CONSTANT } from "../../constant";

export interface IUser {
  _id: Schema.Types.ObjectId;
  userName: string;
  firstName?: string;
  lastName: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  role: string;
  section?: Types.DocumentArray<string>;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
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
    methods: {
      matchPassword(enterPassword: string) {
        return bcryptjs.compareSync(enterPassword, this.password);
      },
    },
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

export const UserModel = new Model(CONSTANT.MODEL_NAME.user, userSchema);
