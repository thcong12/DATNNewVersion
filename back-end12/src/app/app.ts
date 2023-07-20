import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express, { Request, Response, NextFunction } from "express";
import { ConfigApp } from "./config/Config";

export class MyApp {
  private Config: ConfigApp;

  constructor(req: Request, res: Response, next: NextFunction) {
    dotenv.config();
    this.Config = new ConfigApp(req, res, next);
  }
}
