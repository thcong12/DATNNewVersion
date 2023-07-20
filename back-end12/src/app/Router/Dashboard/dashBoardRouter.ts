import express from "express";
import { AdminRouter } from "./Admin/AccountRouter";

export const dashBoardRouter = express.Router();

dashBoardRouter.use("admin", () => {
  new AdminRouter();
});

class DashBoardRouter {}
