import { Sequelize } from "sequelize";

class Database {
  public connect() {
    return new Sequelize("todolist", "root", "MercenaryMusty@9719", {
      host: "localhost",
      dialect: "mysql",
      timezone: "-03:00",
    });
  }
}

export const database = new Database();
