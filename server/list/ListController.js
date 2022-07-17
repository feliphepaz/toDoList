const express = require("express");
const cors = require("cors");
const router = express.Router();
const List = require("./List");

router.use(cors());

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

module.exports = router;
