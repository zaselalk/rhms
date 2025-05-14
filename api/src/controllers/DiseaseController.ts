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

}