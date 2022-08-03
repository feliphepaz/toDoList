const express = require("express");
const cors = require("cors");
const router = express.Router();
const List = require("./List");

router.use(cors());

router.post("/list", (req, res) => {
  List.findAll({ raw: true })
    .then((list) => {
      res.send(list);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.post("/list/register", (req, res) => {
  const message = req.body.message;
  if (message) {
    List.create({
      message,
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(404);
  }
});

router.put("/list/delete", (req, res) => {
  const id = req.body.id;
  if (id) {
    List.findByPk(id)
      .then((list) => {
        list.destroy();
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(404);
  }
});

router.put("/list/edit", (req, res) => {
  const message = req.body.message;
  const id = req.body.id;
  if (id) {
    List.findByPk(id)
      .then((list) => {
        list.update({
          message,
        });
        res.sendStatus(200);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
