import cors, { CorsOptions } from "cors";
import express from "express";
import { CONSTANT } from "../constant";
import bodyParser from "body-parser";
import mongoose from "mongoose";

export class ConfgClass {
  private dbUri: string = CONSTANT.mongoose.url!;
  public app: express.Application;
  private corsOptions: CorsOptions = {
    origin: "*",
    methods: ["GET", "HEAD", "PATCH", "POST", "PUT", "DELETE"],
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    maxAge: 86400,
  };

  constructor() {
    this.app = express();
    this.connectDB();
    this.initializeConfig();
  }
  async connectDB() {
    try {
      await mongoose.connect(this.dbUri);
      console.log("Connected db");
    } catch (e: any) {
      console.log(`Error:${e.message}`);
      process.exit(1);
    }
  }
  private initializeConfig() {
    this.app.use(express.json());
    this.app.use(cors(this.corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", `*`);
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");

      res.setHeader(
        "Access-Control-Expose-Headers",
        "x-access-token, x-refresh-token"
      );
      if (req.method == "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200);
      }
      next();
    });
  }
}
// this.connectMongoDB();
// express.json();
// express.urlencoded({ extended: true });
// cors(corsOptions);
// bodyParser.json();
// this.configHeader();
// this.next();
