import express from "express";
import { ConfgClass } from "./config/configClass";
import { RouterClass } from "./router/router";
import dotenv from "dotenv";
import { send } from "process";

class App {
  public app: express.Application;
  private config: ConfgClass = new ConfgClass();
  private router: RouterClass = new RouterClass();
  constructor() {
    this.app = express();
    this.startServer();
    this.aaa();
  }
  /**
   * name
   */
  public aaa() {
    this.app.get("/", (req, res) => {
      res.send("api work");
    });
  }
  public startServer() {
    this.app.use(this.config.app);
    this.app.use("/api", this.router.router);
  }
  public listen() {
    this.app.listen(3000, () => {
      console.log(`App listening on the port ${3000}`);
    });
  }
}
export default App;
