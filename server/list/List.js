const Sequelize = require("sequelize");
const connection = require("../database/connection");

const List = connection.define("lista", {
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = List;
