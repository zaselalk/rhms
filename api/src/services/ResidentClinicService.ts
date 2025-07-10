import { ResidentClinic } from '../models/residentClinic';
import { ResidentClinicRepository } from '../repositories/ResidentClinicRepository';
import { Resident } from "../models/resident";
import { Division } from "../models/division";
import { Sequelize } from "sequelize";

export class ResidentClinicService {
  constructor(private residentClinicRepository: ResidentClinicRepository) {}

  async createResidentClinic(residentId: number, clinicId: number): Promise<ResidentClinic> {
    return this.residentClinicRepository.createResidentClinic(residentId, clinicId);
  }

  async findByResidentId(residentId: number): Promise<ResidentClinic | null> {
    return this.residentClinicRepository.findByResidentId(residentId);
  }

  async findByClinicId(clinicId: number): Promise<ResidentClinic | null> {
    return this.residentClinicRepository.findByClinicId(clinicId);
  }

  async getAllResidentClinics(): Promise<ResidentClinic[]> {
    return this.residentClinicRepository.getAllResidentClinics();
  }

  async deleteResidentClinic(id: number): Promise<void> {
    await this.residentClinicRepository.deleteResidentClinic(id);
  }

  async findByResidentIdAndClinicId(residentId: number, clinicId: number): Promise<ResidentClinic | null> {
    return this.residentClinicRepository.findByResidentIdAndClinicId(residentId, clinicId);
  }

  // Get residents registered for a specific clinic
  async getResidentsByClinicId(clinicId: number): Promise<Resident[]> {
    return Resident.findAll({
      include: [
        {
          model: ResidentClinic,
          where: { clinicId },
        },
      ],
    });
  }

  // Get division-wise resident count for a specific clinic
  async getDivisionPatientCountByClinic(clinicId: number): Promise<{ divisionId: number; divisionName: string; count: number }[]> {
    const results = await Resident.findAll({
      include: [
        {
          model: ResidentClinic,
          where: { clinicId },
          attributes: [],
        },
        {
          model: Division,
          attributes: ['name'],
        },
      ],
      attributes: [
        'divisionId',
        [Sequelize.fn('COUNT', Sequelize.col('Resident.id')), 'count'],
      ],
      group: ['divisionId', 'Division.id'],
      raw: true,
    });

    return results.map((r: any) => ({
      divisionId: r.divisionId,
      divisionName: r['Division.name'],
      count: parseInt(r.count),
    }));
  }
}
