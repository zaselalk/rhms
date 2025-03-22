import { Request, Response } from "express";
import { Clinic } from "../models/clinic"; // Import Clinic model

class ClinicController {
  // Ping function to check if the controller is active
  ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "Pong" });
    });
  }

  // Create function to add a new clinic
  async create(req: Request, res: Response): Promise<Response> {
    const {
        id,
      name,
      patient_count,
      category,
    } = req.body;

    // Creating a new clinic entry in the database
    const clinic = await Clinic.create({
        id,
      name,
      patient_count,
      category,
    });

    return res.json(clinic);  // Return the created clinic as a response
  }
}

export default ClinicController;
