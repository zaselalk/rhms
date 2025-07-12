import { Request, Response } from "express";
import DivisionService from "../services/DivisionService";

class DivisionController {
  async getAll(req: Request, res: Response) {
    try {
      const divisions = await DivisionService.getAllDivisions();

      console.log(divisions);
      res.status(200).json(divisions);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const division = await DivisionService.getDivisionById(id);
      res.status(200).json(division);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { divisionName } = req.body;
      const newDivision = await DivisionService.createDivision(divisionName);
      res.status(201).json(newDivision);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { divisionName } = req.body;
      const updatedDivision = await DivisionService.updateDivision(
        id,
        divisionName,
      );
      res.status(200).json(updatedDivision);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await DivisionService.deleteDivision(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async DivisionCount(req: Request, res: Response) {
    console.log("Fetching division count");
    try {
      const count = await DivisionService.getDivisionCount();
      res.status(200).json({
        message: "Division count fetched successfully",
        status: 200,
        error: null,
        data: { count },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching division count",
        status: 500,
        error: error.message,
        data: null,
      });
    }
  }
}

export default new DivisionController();
