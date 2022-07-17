const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./database/connection");
const ListController = require("./list/ListController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ListController);

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Servidor rodando");
});
