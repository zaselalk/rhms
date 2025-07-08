import { Division } from "../models/division";

class DivisionRepository {
  async getAllDivisions() {
    return await Division.findAll();
  }

  async getDivisionById(id: number) {
    return await Division.findByPk(id);
  }

  async getDivisionByName(name: string) {
    return await Division.findOne({ where: { divisionName: name } });
  }

  async createDivision(divisionName: string) {
    return await Division.create({ divisionName });
  }

  async updateDivision(
    id: number,
    updatedData: Partial<{ divisionName: string }>
  ) {
    const division = await Division.findByPk(id);
    if (!division) return null;
    return await division.update(updatedData);
  }

  async deleteDivision(id: number) {
    return await Division.destroy({ where: { divisionId: id } });
  }

  async getDivisionCount(): Promise<number> {
    return await Division.count();
  }
}

export default new DivisionRepository();
