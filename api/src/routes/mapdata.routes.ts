import express, { Router } from "express";
import catchAsync from "../util/catchAsync";
import { MapController } from "../controllers/MapControlller";

const MapdataRouter: Router = Router();
const mapcontroller = new MapController();

// Ping endpoint for testing
MapdataRouter.get("/ping", catchAsync(mapcontroller.mapPing));

MapdataRouter.get("/getlocation", catchAsync(mapcontroller.getAllHouseLocations));



export default MapdataRouter;