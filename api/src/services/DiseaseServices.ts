
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

  async getAllDiseases(): Promise<Disease[]> {
    return this.diseaseRepository.getAllDiseases();
  }


  async deleteDisease(diseaseName: string): Promise<number> {
  return this.diseaseRepository.deleteDisease(diseaseName);
}

  async getDiseaseCountsByDivision(
    diseaseName: string
  ): Promise<{ division: number; count: number }[]> {
    return this.diseaseRepository.getDiseaseCountsByDivision(diseaseName);
  }

}