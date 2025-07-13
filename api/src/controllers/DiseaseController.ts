import { Request, Response } from "express";
import { DiseaseServices } from "../services/DiseaseServices";
import { DiseaseRepository } from "../repositories/DiseaseRepository";

export class DiseaseController {
  private diseaseService: DiseaseServices;

  constructor() {
    const diseasedRepository = new DiseaseRepository();

    this.diseaseService = new DiseaseServices(diseasedRepository);
  }

  createDisease = async (req: Request, res: Response): Promise<Response> => {
    const { diseaseName } = req.body;

    if (!diseaseName) {
      return res.status(400).json({ message: "Disease name is required" });
    }

    try {
      const disease = await this.diseaseService.registerDisease(diseaseName);
      return res.status(201).json(disease);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  getAllDiseases = async (req: Request, res: Response): Promise<Response> => {
    try {
      const diseases = await this.diseaseService.getAllDiseases();
      return res.status(200).json(diseases);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  deleteDisease = async (req: Request, res: Response): Promise<Response> => {
    const { diseaseName } = req.params;

    if (!diseaseName) {
      return res.status(400).json({ message: "Disease name is required" });
    }

    try {
      const result = await this.diseaseService.deleteDisease(diseaseName);
      if (result === 0) {
        return res.status(404).json({ message: "Disease not found" });
      }
      return res.status(200).json({ message: "Disease deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  countDisease = async (req: Request, res: Response): Promise<Response> => {
    try {
      const count = await this.diseaseService.countDisease();
      return res.status(200).json({
        message: "Disease count fetched successfully",
        status: 200,
        error: null,
        data: { count },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching disease count",
        status: 500,
        error: "",
        data: null,
      });
    }
  };

  getAllDiseaseswithID = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const diseases = await this.diseaseService.getAllDiseaseswithID();
      return res.status(200).json({
        message: "Diseases fetched successfully",
        status: 200,
        error: null,
        data: diseases,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching diseases",
        status: 500,
        error: error,
        data: null,
      });
    }
  };
}
