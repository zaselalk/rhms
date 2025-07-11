import { Router } from "express";
import DivisionController from "../controllers/DivisionController";

const DivisionRouter:Router = Router();


DivisionRouter.get("/", DivisionController.getAll);
DivisionRouter.get("/:id", DivisionController.getById);
DivisionRouter.post("/", DivisionController.create);
DivisionRouter.put("/:id", DivisionController.update);
DivisionRouter.delete("/:id", DivisionController.delete);
DivisionRouter.get("/count/:id", DivisionController.DivisionCount);

export default DivisionRouter;
