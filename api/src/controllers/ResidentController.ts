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

  getAllResident = async (req: Request, res: Response): Promise<Response | void> => {

    const residents = await this.residentService.getAllResident();
    if (!residents) {
      return res.status(404).json({ message: "Resident not found" });
    } else {
      res.status(200).json(residents);
    }

  }

  updateResident = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID provided" });
        }

        const updateData = req.body;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        const updatedResident = await this.residentService.updateResident(id, updateData);

        if (!updatedResident) {
            return res.status(404).json({ message: "Resident not found" });
        }

        return res.json({ message: "Resident updated successfully", resident: updatedResident });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({ message: "Error updating resident"});
    }

  }


  deleteResidentById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID provided" });
        }

        const deleted = await this.residentService.deleteResident(id);

        if (!deleted) {
            return res.status(404).json({ message: "Resident not found" });
        }

        return res.json({ message: "Resident deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ message: "Error deleting resident"});
    }
};


}

export default ResidentController;
