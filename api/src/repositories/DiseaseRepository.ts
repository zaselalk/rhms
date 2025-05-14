import Disease from "../models/disease";


export class DiseaseRepository {
  async createDisease(
    diseaseName: string,
  ): Promise<Disease> {
    return await Disease.create({
      diseaseId: 0, // Assuming id is auto-incremented by the database
      diseaseName
    });
  }

  async getAllDiseases(): Promise<Disease[]> {
    return await Disease.findAll({
      attributes: ['diseaseName'],
      order: [['diseaseName', 'ASC']] // Optional: to sort alphabetically
    });
  }
}
