// controllers/HouseholdResidentController.ts

import { Request, Response } from "express";
import { HouseholdResidentServices } from "../services/HouseholdResidentService";
import { r } from "react-router/dist/development/fog-of-war-CvttGpNz";

export class HouseholdResidentController {
  private service: HouseholdResidentServices;

  constructor() {
    this.service = new HouseholdResidentServices();
  }

  // GET /household/:id/residents
  getResidentsByHouseholdId = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id } = req.params;
    try {
      const residents = await this.service.getResidentsByHousehold(Number(id));
      return res.json({
        message: "Residents fetched successfully",
        data: residents,
      });
    } catch (error) {
      console.error("Error fetching residents:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // POST /household/:id/add-resident
  addResidentToHousehold = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { id: householdId } = req.params;
    const { residentId, relation } = req.body;

    if (!residentId || !relation) {
      return res
        .status(400)
        .json({ message: "Missing residentId or relation" });
    }

    try {
      const added = await this.service.addResidentToHousehold(
        Number(householdId),
        Number(residentId),
        relation,
      );
      return res.status(201).json({
        message: "Resident added to household",
        data: added,
      });
    } catch (error) {
      console.error("Error adding resident:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // DELETE /household-resident/:id
  removeResident = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const removed = await this.service.removeResidentFromHousehold(
        Number(id),
      );
      if (!removed) {
        return res.status(404).json({ message: "Record not found" });
      }

      return res.json({ message: "Resident removed from household" });
    } catch (error) {
      console.error("Error removing resident:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteHousehold= async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      await this.service.removeAllResidentsByHouseholdId(Number(id));
      return res.json({ message: "All residents removed from household" });
    } catch (error) {
      console.error("Error removing residents:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
