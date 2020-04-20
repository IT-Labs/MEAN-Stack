import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import TestController from "./controllers/test-controller";

class MeanStackServer extends Server {
  private readonly SERVER_START_MSG = "Server started on port: ";
  private readonly DEV_MSG =
    "Express Server is running in development mode. " +
    "No front-end content is being served.";

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    super.addControllers(new TestController());

    // Point to front-end code
    this.serveFrontEndProd();

    // if (process.env.NODE_ENV !== "production") {
    //   console.log("Starting server in development mode");
    //   const msg = this.DEV_MSG + process.env.EXPRESS_PORT;
    //   this.app.get("*", (req, res) => res.send(msg));
    // } else {
    //   this.serveFrontEndProd();
    // }
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_START_MSG + port);
    });
  }

  private serveFrontEndProd(): void {
    const dir = path.join(
      __dirname,
      "public/angular/client-app/dist/client-app/"
    );
    // Set the static and views directory
    this.app.set("views", dir);
    this.app.use(express.static(dir));
    // Serve front-end content
    this.app.get("*", (req, res) => {
      res.sendFile("index.html", { root: dir });
    });
  }
}

export default MeanStackServer;
