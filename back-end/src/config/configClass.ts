import cors, { CorsOptions } from "cors";
import express from "express";
import { CONSTANT } from "../constant";
import bodyParser from "body-parser";
import mongoose from "mongoose";

export class ConfgClass {
  private dbUri: string = CONSTANT.mongoose.url!;
  public app: express.Application;
  private corsOptions: CorsOptions = {
    origin: [
      "http://localhost:4200",
      "http://localhost:4201",
      "http://192.168.1.16:4201",
      "http://192.168.1.16:4200",
    ],
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
    this.app.use(function (req, res, next) {
      // Website you wish to allow to connect
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", `*`);

      // Request methods you wish to allow
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Request headers you wish to allow
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", true as any);

      res.setHeader(
        "Access-Control-Expose-Headers",
        "x-access-token, x-refresh-token"
      );
      if (req.method == "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
      }
      // Pass to next layer of middleware
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
