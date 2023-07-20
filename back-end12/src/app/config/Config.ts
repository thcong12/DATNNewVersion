import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { CONSTANT, HEADER, corsOptions } from "../constant";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export class ConfigApp {
  private request: any;
  private response: any;
  private next: any;
  constructor(req: any, res: any, next: any) {
    this.request = req;
    this.response = res;
    this.next = next;
    this.Oninit();
  }
  protected Oninit() {
    this.connectMongoDB();
    express.json();
    express.urlencoded({ extended: true });
    cors(corsOptions);
    bodyParser.json();
    this.configHeader();
    this.next();
  }
  private async connectMongoDB(): Promise<void> {
    try {
      const client: MongoClient = new MongoClient(CONSTANT.mongo.url!);
      await client.connect();
      console.log("Connected db");
    } catch (e) {
      console.log(`Error:${e.message}`);
      process.exit(1);
    }
  }
  private setHeader(headerTitle: string, headerValue: any) {
    return this.request.setHeader(headerTitle, headerValue);
  }
  private configHeader() {
    HEADER.forEach((headerItiem: any) => {
      this.setHeader(headerItiem.title, headerItiem.value);
    });
    if (this.request.method == "OPTIONS") {
      this.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      return this.response.status(CONSTANT.code_status).json({});
    }
    // Pass to next layer of middleware
    this.next();
  }
}
