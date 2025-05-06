import { Request, Response } from "express";
import { HouseholdServices } from "../services/HouseholdServices";
import { HouseholdRepository } from "../repositories/HouseholdRepository";
import Household from "../models/hosehold";
import Resident from "../models/resident";


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


  //Read all households
  
    // Inside HouseholdController class

getAllHouseholds = async (req: Request, res: Response): Promise<Response> => {
  try {
    const households = await Household.findAll({
      attributes: ["house_no", "owner_id", "grama_division"],
      include: [
        {
          model: Resident,
          as: "owner",
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    return res.json(households);
  } catch (error) {
    console.error("Error fetching households:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

}  
