import { Router } from "express";
import ResidentController from "../controllers/ResidentController";
import { protectRoute } from "../middleware/authjwt.middleware";
import catchAsync from "../util/catchAsync";
import { valiadteResident } from "../validation/resident";


const ResidentRouter: Router = Router();
const residentController = new ResidentController();

ResidentRouter.get("/ping", protectRoute, catchAsync(residentController.residentPing));
ResidentRouter.post(
  "/createResident",

  valiadteResident,
  // protectRoute,
  catchAsync(residentController.residentRegister)
);
ResidentRouter.get('/nic/:nic', catchAsync(residentController.residentfindByNic));
ResidentRouter.get('/id/:id', catchAsync(residentController.residentfindById));
ResidentRouter.get('/residents', catchAsync(residentController.getAllResident));

export default ResidentRouter;
