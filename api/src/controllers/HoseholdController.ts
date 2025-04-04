import { Request, Response } from "express";
import { HouseholdServices } from "../services/HouseholdServices";
import { HouseholdRepository } from "../repositories/HouseholdRepository";
import { ResidentService } from "../services/ResidentService";
import { ResidentRepository } from "../repositories/ResidentRepository";
import { get } from "http";

export class HouseholdController {
  private householdService: HouseholdServices;
  // private residentRepository: ResidentRepository;

  constructor() {
    const householdRepository = new HouseholdRepository();
    // this.residentRepository = new ResidentRepository();
    this.householdService = new HouseholdServices(householdRepository);

  }

  createHousehold = async (req: Request, res: Response): Promise<Response | void> => {

    console.log("Household Service:"); // Debugging step
    // if (!this.householdService) {
    //   console.error("error creating household"); // Debugging step
    //     return res.status(500).json({ message: "householdService is not initialized" });
    // }

    const { house_no, grama_division, longitude, latitude, owner_id } = req.body;
    console.log("Request Body:", req.body)
    const household = await this.householdService.registerHousehold(house_no, grama_division, longitude, latitude,owner_id);
    if (!household) {
      return res.status(400).json({ message: "Failed to create household" });
    }

    return res.json(household);
  };

  // // Read
  // getHousehold = async (req: Request, res: Response): Promise<Response | void> => {
  //   const id = parseInt(req.params.id);
  //   const details = await this.householdService?.getHouseholdDetails(id);

  //   if (!details) {
  //     return res.status(404).json({ message: "Household not found" });
  //   }

  //   return res.status(200).json(details);
  // };

  // // Update
  // updateHouseholdOwner = async (req: Request, res: Response): Promise<Response | void> => {
  //   const id = parseInt(req.params.id);
  //   const { new_owner_id } = req.body;

  //   const updated = await this.householdService?.updateOwner(id, new_owner_id);
  //   if (!updated) {
  //     return res.status(400).json({ message: "Failed to update owner" });
  //   }

  //   return res.status(200).json({ message: "Owner updated", data: updated });
  // };


  // // Delete by house_no
  // deleteHousehold = async (req: Request, res: Response): Promise<Response | void> => {
  //   const { house_no } = req.params;

  //   const deleted = await this.householdService?.deleteHousehold(house_no);
  //   if (!deleted) {
  //     return res.status(404).json({ message: "Household not found or could not be deleted" });
  //   }

  //   return res.status(200).json({ message: "Household deleted", data: deleted });
  // };
}

