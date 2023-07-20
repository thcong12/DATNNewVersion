import express from "express";
import { MyApp } from "./src/app/app.js";
import { CONSTANT } from "./src/app/constant/index.js";

const app: any = express();

app.use((req: any, res: any, next: any) => {
  new MyApp(req, res, next);
});
app.listen(
  CONSTANT.port.server,
  console.log(`Server start ${CONSTANT.port.server}`)
);
// async function startServer() {
//   await dotenv.config();
//   await connectMongoDB();
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.json());
//   app.use(cors(corsOptions));
//   app.use(bodyParser.json());
//   app.use((req, res, next) => {
//     configHeader(req, res, next);
//   });
//   app.listen(
//     CONSTANT_ID.port.server,
//     console.log(`Server start ${CONSTANT_ID.port.server}`)
//   );

// }
// startServer();
