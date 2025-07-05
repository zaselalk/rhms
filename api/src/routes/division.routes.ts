import { Router } from "express";
import DivisionController from "../controllers/DivisionController";

const router = Router();

router.get("/", DivisionController.getAll);
router.get("/:id", DivisionController.getById);
router.post("/", DivisionController.create);
router.put("/:id", DivisionController.update);
router.delete("/:id", DivisionController.delete);

export default router;
