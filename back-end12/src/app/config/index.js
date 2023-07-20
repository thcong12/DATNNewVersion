
import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { CONSTANT_ID, corsOptions } from "../constant/index.js";
import { connectMongoDB } from "./config-mogoose.js";
import cors from "cors"

const app = express();

export async function serverConfig(){
    await dotenv.config();
    await connectMongoDB()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use((req,res,next)=>{configHeader(req,res,next)})
    app.listen(CONSTANT_ID.port.server, console.log(`Server start ${CONSTANT_ID.port.server}`));
}
