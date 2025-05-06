import {ResidentClinic} from '../models/residentClinic';

export class ResidentClinicRepository {
    async createResidentClinic(residentId: number, clinicId: number): Promise<ResidentClinic> {
        return ResidentClinic.create({
        residentId,
        clinicId,
        });
    }
    
    // Find by residentId
    async findByResidentId(residentId: number): Promise<ResidentClinic | null> {
        return ResidentClinic.findOne({
        where: {
            residentId,
        },
        });
    }

    // Find by clinicId
    async findByClinicId(clinicId: number): Promise<ResidentClinic | null> {
        return ResidentClinic.findOne({
        where: {
            clinicId,
        },
        });
    }

    async getAllResidentClinics(): Promise<ResidentClinic[]> {
        return ResidentClinic.findAll();
    }

    async deleteResidentClinic(id: number): Promise<void> {
        await ResidentClinic.destroy({
        where: {
            id,
        },
        });
    }
    
}
