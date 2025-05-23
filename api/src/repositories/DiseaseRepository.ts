import sequelize from "../models";
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

  async deleteDisease(diseaseName: string): Promise<number> {
  return await Disease.destroy({
    where: { diseaseName }
  });
}

  async getDiseaseCountsByDivision(
    diseaseName: string
  ): Promise<{ division: number; count: number }[]> {
    const results = await Disease.findAll({
      where: { diseaseName },
      attributes: [
        'division',
        [sequelize.fn('COUNT', sequelize.col('division')), 'count']
      ],
      group: ['division'],
      raw: true
    });
    return results as unknown as { division: number; count: number }[];
  }

}
