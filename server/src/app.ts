import express from "express";
import bodyParser from "body-parser";
import { Sequelize } from "sequelize/types";
import { database } from "./database";
import { router } from "./routes";

export class App {
  public server: express.Application;
  public connection: Sequelize;

  constructor() {
    this.server = express();
    this.connection = database.connect();
    this.middleware();
    this.connect();
    this.router();
  }

  private middleware() {
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
  }

  private connect() {
    this.connection
      .authenticate()
      .then(() => {
        console.log("Conexão feita com o banco de dados");
      })
      .catch((err) => console.log(err));
  }

  private router() {
    this.server.use(router);
  }
}
