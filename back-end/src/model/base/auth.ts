import { Schema } from "mongoose";

export interface IAuthBase {
  _id: Schema.Types.ObjectId;
  userName: string;
  password: string;
  email?: string;
  section?: string | string[];
  isActive: boolean;
}
export interface MAuthBase {
  mathPassword(password: string): string;
}
