const Sequelize = require("sequelize");

const connection = new Sequelize("todolist", "root", "MercenaryMusty@9719", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});

module.exports = connection;
