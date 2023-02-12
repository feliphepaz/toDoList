import cors from "cors";
import { Router } from "express";
import { listController } from "./controller/ListController";

const router: Router = Router();
router.use(cors());

//Routes
router.get("/list", listController.get);
router.post("/list/register", listController.post);
router.put("/list/edit", listController.put);
router.put("/list/delete", listController.delete);

export { router };
