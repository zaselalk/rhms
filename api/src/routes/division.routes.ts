import { Router } from "express";
import DivisionController from "../controllers/DivisionController";

const DivisionRouter:Router = Router();

DivisionRouter.get("/", DivisionController.getAll);
DivisionRouter.get("/count", DivisionController.DivisionCount);
DivisionRouter.get("/:id", DivisionController.getById);
DivisionRouter.post("/", DivisionController.create);
DivisionRouter.put("/:id", DivisionController.update);
DivisionRouter.delete("/:id", DivisionController.delete);


export default DivisionRouter;
