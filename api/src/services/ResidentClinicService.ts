import { ResidentClinic } from '../models/residentClinic';
import { ResidentClinicRepository } from '../repositories/ResidentClinicRepository';
import { Resident } from "../models/resident";


export class ResidentClinicService {
    constructor(private residentClinicRepository: ResidentClinicRepository) { }

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


}



