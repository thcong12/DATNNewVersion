import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import express, { Request, Response, NextFunction } from "express";

export class BaseApp {
  public request: Request;
  public response: Response;
  public next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.request = req;
    this.response = res;
    this.next = next;
  }
}
