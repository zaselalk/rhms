import { Request, Response } from "express";
import { HouseholdServices } from "../services/HouseholdServices";
import { HouseholdRepository } from "../repositories/HouseholdRepository";

export class HouseholdController {
  private householdService: HouseholdServices;

  constructor() {
    const householdRepository = new HouseholdRepository();
    this.householdService = new HouseholdServices(householdRepository);
  }

  async createHousehold(req: Request, res: Response) : Promise<Response | void> {
    console.log("householdService:", this.householdService); // Debugging step
    if (!this.householdService) {
      console.error("error creating household"); // Debugging step
        return res.status(500).json({ message: "householdService is not initialized" });
    }
    
    const { houseid,password,houseowner,grama_division,income_range,location,familyMember } = req.body;
    const household = await this.householdService.registerHousehold(houseid,password,houseowner,grama_division,income_range,location,familyMember);
    return res.json(household);
  }

  async login(req: Request, res: Response): Promise<Response | void> {
    const { houseid, password } = req.body;
    const household = await this.householdService.loginHousehold(houseid, password);
    return res.status(200).json({ message: "Login successful", household });
  }
}
