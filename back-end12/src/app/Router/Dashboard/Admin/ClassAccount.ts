import { NextFunction, Request, Response, Router } from "express";
import { Schema, Document, Model } from "mongoose";
import { AdminModel, IAdmin } from "../../../model/Admin/Admin";
import asyncHandler from "express-async-handler";
import { CONSTANT } from "../../../constant";

export class AccountAdmin {
  // private req: Request;
  // private res: Response;
  // private next: NextFunction;
  constructor() {
    // this.req = req;
    // this.res = res;
    // this.next = next;
  }
  // get accountId(): string {
  //   return this.req.params.id;
  // }
  // get accountData(): IAdmin {
  //   const data: IAdmin = this.req.body;
  //   return data;
  // }
  async getAccountAdmin(): Promise<IAdmin[] | undefined> {
    const listAccountAdmin = await AdminModel.find({});
    if (listAccountAdmin) {
      return listAccountAdmin as IAdmin[];
    }
    return;
  }
  async getAccountDetail(id: string): Promise<IAdmin | undefined> {
    const accountDetail = await AdminModel.findById(id);
    if (accountDetail) {
      return accountDetail as IAdmin;
    }
    return;
  }
  async putAccountAdmin(id: string, data: IAdmin): Promise<IAdmin | undefined> {
    const accountDetail = await AdminModel.findByIdAndUpdate(
      id,
      {
        $set: {
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          role: data.role,
          isActive: data.isActive,
        },
      },
      {
        new: true,
      }
    );
    if (accountDetail) {
      return accountDetail as IAdmin;
    }
  }
  async postAccountAdmin(data: IAdmin): Promise<IAdmin | undefined> {
    const isAccountExist = await AdminModel.findOne({
      userName: data.userName,
    });
    if (!isAccountExist) {
      const newAccount = await AdminModel.create({
        email: data.email,
        password: data.password || "12345678",
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        role: data.role,
      });
      return newAccount;
    }
    return;
  }
}
