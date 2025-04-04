import { Request, Response } from "express";
import { Clinic } from "../models/clinic"; // Import Clinic model
import { ClinicService } from "../services/ClinicService";
import { promises } from "dns";

class ClinicController {
  private clinicService:ClinicService; // Define the type of clinicRepository

  constructor() {
    this.clinicService = new ClinicService(); // Initialize the clinicService
  }

  // Ping function to check if the controller is active
  ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "Pong" });
    });
  }

  // Function to create a new clinic
  createClinic =async(req:Request,res:Response):Promise<Response | void> => {
    const { name } = req.body; 
    const clinic = await this.clinicService.createClinic(name); // Call the service to create a clinic
    return res.status(201).json(clinic); // Return the created clinic with a 201 status code
  };
  //  // Get all clinics
   getAllClinics = async (req: Request, res: Response): Promise<Response> => {
    const clinics = await this.clinicService.getAllClinics();
    return res.json(clinics);
  }

  // // Get a clinic by ID
  // getClinicById = async (req: Request, res: Response): Promise<Response> => {
  //   const id = Number(req.params.id);
  //   const clinic = await this.clinicService.getClinicById(id);
  // }

  //   if (!clinic) {
  //     return res.status(404).json({ message: "Clinic not found" });
  //   }

  //   return res.json(clinic);
  // };

  // // Update a clinic
  // updateClinic = async (req: Request, res: Response): Promise<Response> => {
  //   const id = Number(req.params.id);
  //   const updatedData = req.body;

  //   const updatedClinic = await this.clinicService.updateClinic(id, updatedData);
  //   if (!updatedClinic) {
  //     return res.status(404).json({ message: "Clinic not found" });
  //   }

  //   return res.json(updatedClinic);
  // };

  // // Delete a clinic
  // deleteClinic = async (req: Request, res: Response): Promise<Response> => {
  //   const id = Number(req.params.id);
  //   const success = await this.clinicService.deleteClinic(id);

  //   if (!success) {
  //     return res.status(404).json({ message: "Clinic not found" });
  //   }

  //   return res.status(204).send();
  // };
}



export default ClinicController;
