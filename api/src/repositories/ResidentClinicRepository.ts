import Clinic from "../models/clinic";
import Resident from "../models/resident";
import { ResidentClinic } from "../models/residentClinic";

export class ResidentClinicRepository {
  async createResidentClinic(
    residentId: number,
    clinicId: number
  ): Promise<ResidentClinic> {
    return ResidentClinic.create({
      residentId,
      clinicId,
    });
  }

  /**
   * Find the clinics associated with a resident by residentId.
   * @param residentId
   * @returns
   */
  async findByResidentId(residentId: number): Promise<ResidentClinic | null> {
    return ResidentClinic.findOne({
      where: {
        residentId,
      },
      include: [
        {
          model: Clinic,
          as: "clinic",
        },
      ],
    });
  }

  /**
   * Find the resident associated with a clinic by clinicId.
   * @param clinicId
   * @returns
   */
  async getAllResidentsInClinicByClinicId(
    clinicId: number
  ): Promise<ResidentClinic[] | null> {
    return ResidentClinic.findAll({
      where: {
        clinicId,
      },
      attributes: [],
      include: [
        {
          model: Resident,
          as: "resident",
          attributes: ["id", "nic", "firstName","lastName", "contactNumber"],
        },
      ],
    });
  }

  // Find by clinicId
  async findByClinicId(clinicId: number): Promise<ResidentClinic | null> {
    return ResidentClinic.findOne({
      where: {
        clinicId,
      },
      include: [
        {
          model: Resident,
          as: "resident",
        },
        {
          model: Clinic,
          as: "clinic",
        },
      ],
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
  async findByResidentIdAndClinicId(
    residentId: number,
    clinicId: number
  ): Promise<ResidentClinic | null> {
    return await ResidentClinic.findOne({
      where: {
        residentId,
        clinicId,
      },
    });
  }
}
