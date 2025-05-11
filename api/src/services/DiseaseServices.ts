import { D } from "react-router/dist/development/route-data-H2S3hwhf";
import { DiseaseRepository } from "../repositories/DiseaseRepository";
import Disease from "../models/disease";

export class DiseaseServices {
  private diseaseRepository: DiseaseRepository;

  constructor(diseaseRepository: DiseaseRepository) {
    this.diseaseRepository = diseaseRepository;
  }

  async registerDisease(
    diseaseName: string,
    

  ): Promise<Disease> {

    return this.diseaseRepository.createDisease(diseaseName);
    
  }

}