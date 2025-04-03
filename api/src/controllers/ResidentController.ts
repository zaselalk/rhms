import { Request, Response } from "express";
import { Resident } from "../models/resident";
import { ResidentService } from "../services/ResidentService";
import { ResidentRepository } from "../repositories/ResidentRepository";

class ResidentController {
  private residentService: ResidentService;

  constructor() {
    const residentRepository = new ResidentRepository();
    this.residentService = new ResidentService(residentRepository);
  }

  residentPing = async (req: Request, res: Response): Promise<Response | void> => {
    return res.json({ message: "Resident ping" });
  }

  residentRegister = async (req: Request, res: Response): Promise<Response | void> => {
    const { 
      firstName,
      lastName,
      nic,
      email,
      password,
      birthday,
      bloodGroup,
      gender,
      bloodPressure,
      heartRate,
      address,
      contactNumber,
      divisionId,
      maritalState,
      educationLevel,
      addicted,
      alergies,
      chronicalDesease,
      height,
      weight,
    } = req.body;

    const resident = await this.residentService.registerResident(
      firstName,
      lastName,
      nic,
      email,
      password,
      birthday,
      bloodGroup,
      gender,
      bloodPressure,
      heartRate,
      address,
      contactNumber,
      divisionId,
      maritalState,
      educationLevel,
      addicted,
      alergies,
      chronicalDesease,
      height,
      weight
    );

    return res.json(resident);
  }

  residentfindByNic = async (req: Request, res: Response): Promise<Response | void> => {
    const { nic } = req.params;
    const resident = await this.residentService.findByNic(nic);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    return res.json(resident);
  }

  residentfindById = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.params;
    const resident = await this.residentService.findById(Number(id));
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    return res.json(resident);
  }



}

export default ResidentController;
