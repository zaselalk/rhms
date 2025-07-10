import { Division } from "../models/division";
import { Op } from "sequelize";

class DivisionRepository {
  async getAllDivisions() {
    return await Division.findAll(); // Only active ones by default (paranoid)
  }

  async getDivisionById(id: number) {
    return await Division.findByPk(id); // Ignores soft-deleted by default
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

  // ✅ Soft delete
  async deleteDivision(id: number) {
    const division = await Division.findByPk(id);
    if (!division) return null;
    await division.destroy(); // soft delete
    return division;
  }

  // ✅ Restore a soft-deleted division
  async restoreDivision(id: number) {
    const division = await Division.findByPk(id, { paranoid: false });
    if (!division || !division.deletedAt) return null;
    await division.restore();
    return division;
  }

  // ✅ Get all soft-deleted divisions
  async getDeletedDivisions() {
    return await Division.findAll({
      where: {
        deletedAt: { [Op.not]: null },
      },
      paranoid: false,
    });
  }

  // ✅ Optional: Get all divisions including soft-deleted ones
  async getAllWithDeleted() {
    return await Division.findAll({ paranoid: false });
  }

  // ✅ Count only non-deleted divisions
  async getDivisionCount(): Promise<number> {
    return await Division.count();
  }

  // ✅ Optional: Count including soft-deleted
  async getTotalDivisionCount(): Promise<number> {
    return await Division.count({ paranoid: false });
  }
}

export default new DivisionRepository();
