import express, { NextFunction, Router } from "express";
import asyncHandler from "express-async-handler";
import { AccountAdmin } from "./ClassAccount";
import { CONSTANT } from "../../../constant";
import { IAdmin } from "../../../model/Admin/Admin";

export class AdminRouter {
  adminAccount: AccountAdmin;
  router: Router;
  constructor() {
    this.adminAccount = new AccountAdmin();
  }
  getAllAccountAdmin() {
    this.router.get(
      "/",
      asyncHandler(async (req, res) => {
        const data = await this.adminAccount.getAccountAdmin();
        res.json(data);
      })
    );
  }
  getAccountDetailAdmin() {
    this.router.get(
      "/:id",
      asyncHandler(async (req, res) => {
        const accountId = req.params.id;
        const data = await this.adminAccount.getAccountDetail(accountId);
        res.json(data);
      })
    );
  }
  modifyAccountAdmin() {
    this.router.put(
      "/:id",
      asyncHandler(async (req, res) => {
        const accountId = req.params.id;
        const reqData: IAdmin = req.body;
        const data = await this.adminAccount.putAccountAdmin(
          accountId,
          reqData
        );
        res.json(data);
      })
    );
  }
  createAccountAdmin() {
    this.router.put(
      "/:id",
      asyncHandler(async (req, res) => {
        const reqData: IAdmin = req.body;
        const data = await this.adminAccount.postAccountAdmin(reqData);
        res.json(data);
      })
    );
  }
}
