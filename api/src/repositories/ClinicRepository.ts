import { Op } from "sequelize";
import { Clinic } from "../models/clinic";

export class ClinicRepository {
  // Create a new clinic
  async createClinic(name: string): Promise<Clinic> {
    return Clinic.create({ name });
  }

  // Get all clinics that are NOT soft-deleted
  async getAllClinics(): Promise<Clinic[]> {
    return Clinic.findAll(); // default excludes deleted rows because paranoid: true
  }

  // Get a clinic by ID (excluding soft-deleted)
  async getClinicById(id: number): Promise<Clinic | null> {
    return Clinic.findByPk(id); // excludes deleted by default
  }

  // Update a clinic by ID
  async updateClinic(id: number, updatedData: Partial<Clinic>): Promise<Clinic | null> {
    const clinic = await Clinic.findByPk(id);
    if (!clinic) return null;

    await clinic.update(updatedData);
    return clinic;
  }

  // Soft delete a clinic by ID (sets deletedAt)
  async deleteClinic(id: number): Promise<boolean> {
    const clinic = await Clinic.findByPk(id);
    if (!clinic) return false;

    await clinic.destroy(); // sets deletedAt timestamp
    return true;
  }

  // Restore a soft-deleted clinic by ID
  async restoreClinic(id: number): Promise<boolean> {
    const clinic = await Clinic.findOne({
      where: { id },
      paranoid: false, // include deleted
    });
    if (!clinic || !clinic.deletedAt) return false;

    await clinic.restore(); // removes deletedAt timestamp
    return true;
  }

  // Get all soft-deleted clinics
  async getDeletedClinics(): Promise<Clinic[]> {
    return Clinic.findAll({
      where: {
        deletedAt: { [Op.not]: null },
      },
      paranoid: false,
    });
  }
}
