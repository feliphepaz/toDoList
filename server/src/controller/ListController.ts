import { Request, Response } from "express";
import { ModelStatic } from "sequelize/types";
import { list } from "../model/List";

class ListController {
  public listModel: ModelStatic<any>;

  constructor() {
    this.listModel = list.handle();
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  public get(req: Request, res: Response) {
    this.listModel
      .findAll({ raw: true })
      .then((list) => {
        res.send(list);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  }

  public post(req: Request, res: Response) {
    const message = req.body.message;
    if (message) {
      this.listModel
        .create({
          message,
          completed: 0,
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
  }

  public put(req: Request, res: Response) {
    const message = req.body.message;
    const completed = req.body.completed;
    const id = req.body.id;
    if (id) {
      this.listModel
        .findByPk(id)
        .then((list) => {
          list.update({
            message,
            completed,
          });
          res.sendStatus(200);
        })
        .catch(() => {
          res.sendStatus(404);
        });
    } else {
      res.sendStatus(404);
    }
  }

  public delete(req: Request, res: Response) {
    const id = req.body.id;
    if (id) {
      this.listModel
        .findByPk(id)
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
  }
}

export const listController = new ListController();
