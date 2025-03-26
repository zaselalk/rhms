import { Request, Response } from "express";
import { Clinic } from "../models/clinic"; // Import Clinic model

class ClinicController {
  // Ping function to check if the controller is active
  ping(req: Request, res: Response): Promise<Response> {
    return new Promise((resolve) => {
      return res.json({ message: "Pong" });
    });
  }

  // Create a new clinic
  async create(req: Request, res: Response): Promise<Response> {
    const { id, name, patient_count, category } = req.body;

    try {
      const clinic = await Clinic.create({ id, name, patient_count, category });
      return res.status(201).json(clinic);  // Return the created clinic with a 201 status
    } catch (error) {
      return res.status(500).json({ error: "Failed to create clinic", details: error });
    }
  }

  // Retrieve all clinics
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const clinics = await Clinic.findAll();  // Fetch all clinics from the database
      return res.json(clinics);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch clinics", details: error });
    }
  }

  // Retrieve a specific clinic by ID
  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const clinic = await Clinic.findByPk(id);  // Find clinic by primary key (ID)
      if (!clinic) {
        return res.status(404).json({ error: "Clinic not found" });
      }
      return res.json(clinic);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch clinic", details: error });
    }
  }

  // Update an existing clinic by ID
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, patient_count, category } = req.body;

    try {
      const clinic = await Clinic.findByPk(id);
      if (!clinic) {
        return res.status(404).json({ error: "Clinic not found" });
      }

      // Update clinic fields
      clinic.name = name || clinic.name;
      clinic.patient_count = patient_count || clinic.patient_count;
      clinic.category = category || clinic.category;

      await clinic.save();  // Save the updated clinic
      return res.json(clinic);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update clinic", details: error });
    }
  }

  // Delete a clinic by ID
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const clinic = await Clinic.findByPk(id);
      if (!clinic) {
        return res.status(404).json({ error: "Clinic not found" });
      }

      await clinic.destroy();  // Delete the clinic
      return res.json({ message: `Clinic with ID ${id} deleted successfully` });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete clinic", details: error });
    }
  }
}

export default ClinicController;
