import express, { Application, Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { UploadModule } from "./UploadModule";
import { StudyModule } from "./StudyModule";
import { TransferModule } from "./TransferModule";
import {} from "express"
import fileUpload from "express-fileupload";
export class App {
  public app: Application;
  private port = process.env.PORT || 3000;
  private BASE_URL = "/api";
  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setControllers();
  }
  private setMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(fileUpload());
    this.app.use(express.urlencoded({ extended: true }));
  };
  private setControllers = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("<h2>Hello world!!</h2>");
    });
    this.app.use(`${this.BASE_URL}/upload`,  new UploadModule().router);
    this.app.use(`${this.BASE_URL}/studies`, new StudyModule().router);
    this.app.use(`${this.BASE_URL}/transfer`, new TransferModule().router);
  };
  private connectDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL || "").then(() => {
        console.log(
          `Your database is successfully connected to the application!!!!!`
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong while connecting to the database !");
      }
    }
  };
  public initializeServer = async () => {
    try {
      await this.connectDatabase();
      this.app.listen(this.port, () => {
        console.log(
          `Congratulations your server is running on port ${this.port} !!`
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong while starting the server !");
      }
    }
  };
}

