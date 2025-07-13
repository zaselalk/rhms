// controllers/HouseholdResidentController.ts

import { Request, Response } from "express";
import { HouseholdResidentServices } from "../services/HouseholdResidentService";

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

  // PUT /household-resident/:householdId/update-owner
updateOwnerResident = async (req: Request, res: Response): Promise<Response> => {
  const { householdId } = req.params;
  const { residentId } = req.body;

  console.log(`Received update-owner request for householdId ${householdId} and residentId ${residentId}`);

  if (!residentId) {
    console.error("Missing residentId in request body");
    return res.status(400).json({ message: "Missing residentId" });
  }

  try {
    const success = await this.service.updateOwnerResidentRelation(
      Number(householdId),
      Number(residentId)
    );

    if (!success) {
      console.error(`Owner relation not found for householdId ${householdId}`);
      return res.status(404).json({ message: "Owner relation not found" });
    }

    console.log(`Successfully updated owner for householdId ${householdId}`);
    return res.json({ message: "Household owner updated successfully" });
  } catch (error) {
    console.error("Error updating owner relation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



}
