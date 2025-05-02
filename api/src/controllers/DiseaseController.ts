import { Request, Response } from "express";
import { DiseaseServices } from "../services/DiseaseServices";
import { DiseaseRepository } from "../repositories/DiseaseRepository";

export class DiseaseController {
  private diseaseService: DiseaseServices;
  

  constructor() {
    const diseasedRepository = new DiseaseRepository();
   
    this.diseaseService = new DiseaseServices(diseasedRepository);

  }

  createDisease= async (req: Request, res: Response): Promise<Response | void> => {

    const { diseaseName } = req.body;
    console.log("Request Body:", req.body)
    const disease = await this.diseaseService.registerDisease(diseaseName);
    if (!disease) {
      return res.status(400).json({ message: "Failed to create Disease" });
    }

    return res.json(disease);
  };
  

}