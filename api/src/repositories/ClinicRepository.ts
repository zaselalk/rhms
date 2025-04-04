import { Clinic } from "../models/clinic";

  export class ClinicRepository {
    async createClinic(name: string): Promise<Clinic> {
      return Clinic.create({
          name
      });
    }
    
  // // Get all clinics
  async getAllClinics(): Promise<Clinic[]> {
    return Clinic.findAll();
  }

  // // Get a clinic by ID
  async getClinicById(id: number): Promise<Clinic | null> {
    return Clinic.findByPk(id);
  }

  // // Update a clinic by ID
  // async updateClinic(id: number, updatedData: Partial<Clinic>): Promise<Clinic | null> {
  //   const clinic = await Clinic.findByPk(id);
  //   if (!clinic) return null;

  //   await clinic.update(updatedData);
  //   return clinic;
  // }

  // // Delete a clinic by ID
  // async deleteClinic(id: number): Promise<boolean> {
  //   const deletedCount = await Clinic.destroy({
  //     where: { id },
  //   });

  //   return deletedCount > 0;
  // }
}
  
  

  