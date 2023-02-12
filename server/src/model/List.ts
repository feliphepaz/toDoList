import sequelize from "sequelize";
import { Sequelize } from "sequelize/types";
import { database } from "../database";

class List {
  public connection: Sequelize;

  constructor() {
    this.connection = database.connect();
  }

  public handle() {
    return this.connection.define("lista", {
      message: {
        type: sequelize.STRING,
        allowNull: false,
      },
      completed: {
        type: sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  }
}

export const list = new List();
